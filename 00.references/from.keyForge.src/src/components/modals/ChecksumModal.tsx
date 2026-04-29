import { useState, useEffect } from "react";
import * as bip39 from "bip39";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChecksumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seedPhrase: string;
  onSeedPhraseChange: (phrase: string) => void;
}

export const ChecksumModal = ({ open, onOpenChange, seedPhrase, onSeedPhraseChange }: ChecksumModalProps) => {
  const [inputSeedPhrase, setInputSeedPhrase] = useState(seedPhrase);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean | null;
    message: string;
    wordCount: number;
    details: string[];
    invalidWordIndices: number[];
    words: string[];
    wordSuggestions: Map<number, string[]>;
    checksumExplanation: string;
    fixSuggestions: string[];
    autoFixedPhrases: string[];
  }>({
    isValid: null,
    message: "",
    wordCount: 0,
    details: [],
    invalidWordIndices: [],
    words: [],
    wordSuggestions: new Map(),
    checksumExplanation: "",
    fixSuggestions: [],
    autoFixedPhrases: [],
  });
  const [isCalculatingFixes, setIsCalculatingFixes] = useState(false);
  const { toast } = useToast();

  // Update input when seedPhrase prop changes
  useEffect(() => {
    if (open && seedPhrase) {
      setInputSeedPhrase(seedPhrase);
    }
  }, [open, seedPhrase]);

  // Calculate Levenshtein distance between two strings
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  // Find similar words from BIP39 wordlist
  const findSimilarWords = (invalidWord: string, wordlist: string[]): string[] => {
    const suggestions: { word: string; distance: number; score: number }[] = [];
    const lowerInvalid = invalidWord.toLowerCase();
    
    // Dynamic threshold based on word length (longer words get more tolerance)
    const maxDistance = Math.max(2, Math.floor(invalidWord.length * 0.4));
    
    for (const word of wordlist) {
      const distance = levenshteinDistance(lowerInvalid, word.toLowerCase());
      
      // Multiple scoring strategies
      let score = 0;
      
      // 1. Levenshtein distance (lower is better)
      if (distance <= maxDistance) {
        score += (maxDistance - distance) * 10;
      }
      
      // 2. Prefix matching (bonus for matching start)
      const commonPrefixLength = (() => {
        let length = 0;
        for (let i = 0; i < Math.min(lowerInvalid.length, word.length); i++) {
          if (lowerInvalid[i] === word[i]) length++;
          else break;
        }
        return length;
      })();
      score += commonPrefixLength * 5;
      
      // 3. Suffix matching (bonus for matching end)
      const commonSuffixLength = (() => {
        let length = 0;
        const minLen = Math.min(lowerInvalid.length, word.length);
        for (let i = 1; i <= minLen; i++) {
          if (lowerInvalid[lowerInvalid.length - i] === word[word.length - i]) length++;
          else break;
        }
        return length;
      })();
      score += commonSuffixLength * 3;
      
      // 4. Contains substring (bonus if one is contained in the other)
      if (lowerInvalid.includes(word) || word.includes(lowerInvalid)) {
        score += 8;
      }
      
      // 5. Similar length (bonus for similar word length)
      const lengthDiff = Math.abs(invalidWord.length - word.length);
      if (lengthDiff <= 2) {
        score += (3 - lengthDiff) * 2;
      }
      
      // Only include if we have some score or distance is reasonable
      if (score > 0 || distance <= maxDistance) {
        suggestions.push({ word, distance, score });
      }
    }
    
    // Sort by score (descending) then by distance (ascending)
    return suggestions
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.distance - b.distance;
      })
      .slice(0, 8)  // Return top 8 suggestions
      .map(s => s.word);
  };

  // Try to fix the checksum by finding valid word replacements
  const findChecksumFixedPhrases = (words: string[]): string[] => {
    const validPhrases: string[] = [];
    const wordlist = bip39.wordlists.english || bip39.wordlists['english'];
    
    if (!wordlist) return validPhrases;

    // Strategy 1: Try replacing the last word (which contains the checksum)
    // This is the most common case - the last word might be wrong
    const wordsExceptLast = words.slice(0, -1);
    for (const lastWord of wordlist) {
      const testPhrase = [...wordsExceptLast, lastWord].join(" ");
      if (bip39.validateMnemonic(testPhrase)) {
        validPhrases.push(testPhrase);
        if (validPhrases.length >= 3) break; // Limit to 3 suggestions for last word
      }
    }

    // Strategy 2: Try replacing each word with similar words
    if (validPhrases.length === 0) {
      for (let i = 0; i < words.length; i++) {
        const similarWords = findSimilarWords(words[i], wordlist);
        
        for (const similarWord of similarWords) {
          const testWords = [...words];
          testWords[i] = similarWord;
          const testPhrase = testWords.join(" ");
          
          if (bip39.validateMnemonic(testPhrase)) {
            validPhrases.push(testPhrase);
            if (validPhrases.length >= 5) break;
          }
        }
        
        if (validPhrases.length >= 5) break;
      }
    }

    // Strategy 3: Try adjacent positions for transposition errors
    if (validPhrases.length === 0) {
      for (let i = 0; i < words.length - 1; i++) {
        const testWords = [...words];
        // Swap adjacent words
        [testWords[i], testWords[i + 1]] = [testWords[i + 1], testWords[i]];
        const testPhrase = testWords.join(" ");
        
        if (bip39.validateMnemonic(testPhrase)) {
          validPhrases.push(testPhrase);
          if (validPhrases.length >= 3) break;
        }
      }
    }

    return validPhrases;
  };

  const validateChecksum = () => {
    const trimmedPhrase = inputSeedPhrase.trim();
    
    if (!trimmedPhrase) {
      setValidationResult({
        isValid: false,
        message: "Please enter a seed phrase to validate",
        wordCount: 0,
        details: [],
        invalidWordIndices: [],
        words: [],
        wordSuggestions: new Map(),
        checksumExplanation: "",
        fixSuggestions: [],
        autoFixedPhrases: [],
      });
      toast({
        title: "Validation Error",
        description: "Seed phrase cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const words = trimmedPhrase.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Check if word count is valid for BIP39
    const validWordCounts = [12, 15, 18, 21, 24];
    if (!validWordCounts.includes(wordCount)) {
      setValidationResult({
        isValid: false,
        message: `Invalid word count: ${wordCount}. BIP39 requires 12, 15, 18, 21, or 24 words.`,
        wordCount,
        details: [
          `Found ${wordCount} words`,
          `BIP39 valid word counts: ${validWordCounts.join(", ")}`,
        ],
        invalidWordIndices: [],
        words: words,
        wordSuggestions: new Map(),
        checksumExplanation: "",
        fixSuggestions: [],
        autoFixedPhrases: [],
      });
      toast({
        title: "Validation Failed",
        description: `Invalid word count: ${wordCount}`,
        variant: "destructive",
      });
      return;
    }

    // Validate using BIP39
    const isValid = bip39.validateMnemonic(trimmedPhrase);
    
    const details: string[] = [
      `Word count: ${wordCount}`,
      `Entropy bits: ${(wordCount / 3) * 32}`,
      `Checksum: ${isValid ? "Valid ✓" : "Invalid ✗"}`,
    ];

    // Track invalid word indices and suggestions
    const invalidWordIndices: number[] = [];
    const wordSuggestions = new Map<number, string[]>();

    if (isValid) {
      setValidationResult({
        isValid: true,
        message: "Seed phrase checksum is valid!",
        wordCount,
        details,
        invalidWordIndices: [],
        words: words,
        wordSuggestions: new Map(),
        checksumExplanation: "",
        fixSuggestions: [],
        autoFixedPhrases: [],
      });
      toast({
        title: "Validation Success",
        description: "Seed phrase checksum is valid",
      });
    } else {
      // Additional checks for invalid mnemonics
      const invalidWords: string[] = [];
      let allWordsValid = true;
      
      try {
        const wordlist = bip39.wordlists.english || bip39.wordlists['english'];
        if (wordlist) {
          words.forEach((word, index) => {
            if (!wordlist.includes(word)) {
              allWordsValid = false;
              invalidWordIndices.push(index);
              invalidWords.push(`Word ${index + 1} "${word}" is not in BIP39 wordlist`);
              
              // Find similar words for suggestions
              const suggestions = findSimilarWords(word, wordlist);
              if (suggestions.length > 0) {
                wordSuggestions.set(index, suggestions);
              }
            }
          });
        }
      } catch (error) {
        // Wordlist check failed, continue without it
      }

      // Build checksum explanation and fix suggestions
      let checksumExplanation = "";
      const fixSuggestions: string[] = [];
      let autoFixedPhrases: string[] = [];

      if (invalidWords.length > 0) {
        details.push(...invalidWords);
        checksumExplanation = "The checksum failed because one or more words are not in the BIP39 wordlist. BIP39 seed phrases use a checksum derived from the entropy, and only valid BIP39 words can produce a valid checksum.";
        fixSuggestions.push("Replace the invalid words highlighted in red with the suggested replacements below");
        fixSuggestions.push("Double-check the spelling of each word against the BIP39 wordlist");
        fixSuggestions.push("Ensure words are separated by single spaces");
      } else {
        // If checksum fails but all words are valid, try to find valid phrases
        details.push("All words appear to be valid BIP39 words, but checksum validation failed");
        details.push("This usually means one or more words are incorrect");
        checksumExplanation = "The checksum failed even though all words are valid BIP39 words. This happens when one or more words in your seed phrase are incorrect but happen to be valid BIP39 words (e.g., typing 'word' instead of 'wood'). The BIP39 checksum is calculated from the entropy encoded in the words, and a single wrong word will cause the checksum validation to fail.";
        fixSuggestions.push("Review the auto-generated valid seed phrases below that are similar to your input");
        fixSuggestions.push("Carefully compare each word in your seed phrase with your original backup");
        fixSuggestions.push("Check for common typos: similar-looking letters (e/i, o/a, u/n), swapped letters, or extra/missing characters");
        fixSuggestions.push("Verify the word order is correct - words must be in the exact order they were generated");
        
        // Try to find valid phrases
        autoFixedPhrases = findChecksumFixedPhrases(words);
      }

      setValidationResult({
        isValid: false,
        message: "Seed phrase checksum is invalid",
        wordCount,
        details,
        invalidWordIndices: invalidWordIndices,
        words: words,
        wordSuggestions: wordSuggestions,
        checksumExplanation: checksumExplanation,
        fixSuggestions: fixSuggestions,
        autoFixedPhrases: autoFixedPhrases,
      });
      toast({
        title: "Validation Failed",
        description: "Seed phrase checksum is invalid",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setValidationResult({
      isValid: null,
      message: "",
      wordCount: 0,
      details: [],
      invalidWordIndices: [],
      words: [],
      wordSuggestions: new Map(),
      checksumExplanation: "",
      fixSuggestions: [],
      autoFixedPhrases: [],
    });
    onOpenChange(false);
  };

  const handleReplaceWord = (index: number, replacement: string) => {
    // Use the current input seed phrase instead of the original validation result
    const currentWords = inputSeedPhrase.trim().split(/\s+/).filter(word => word.length > 0);
    currentWords[index] = replacement;
    const newPhrase = currentWords.join(" ");
    setInputSeedPhrase(newPhrase);
    onSeedPhraseChange(newPhrase);
    toast({
      title: "Word Replaced",
      description: `Word ${index + 1} replaced with "${replacement}". Updated in main form.`,
    });
  };

  const handleUseFixedPhrase = (phrase: string) => {
    setInputSeedPhrase(phrase);
    onSeedPhraseChange(phrase);
    toast({
      title: "Phrase Applied",
      description: "The corrected seed phrase has been applied to the main form. Click 'Validate Checksum' to verify.",
    });
  };

  // Clean input by removing non-letter characters (except spaces)
  const cleanSeedPhraseInput = (input: string): string => {
    // Remove all characters that are not letters or spaces
    // Then collapse multiple spaces into single spaces and trim
    return input
      .replace(/[^a-zA-Z\s]/g, ' ')  // Replace non-letters (except spaces) with spaces
      .replace(/\s+/g, ' ')           // Collapse multiple spaces into one
      .trim()                          // Remove leading/trailing spaces
      .toLowerCase();                  // BIP39 words are lowercase
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const cleaned = cleanSeedPhraseInput(e.target.value);
    setInputSeedPhrase(cleaned);
  };

  // Determine if we should use wide layout (when validation failed with explanation or suggestions)
  const hasInvalidWordsWithSuggestions = 
    !validationResult.isValid && 
    validationResult.isValid !== null &&
    (validationResult.invalidWordIndices.length > 0 || 
     validationResult.checksumExplanation || 
     validationResult.autoFixedPhrases.length > 0);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`${hasInvalidWordsWithSuggestions ? 'max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw]' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>BIP39 Checksum Validation</DialogTitle>
          <DialogDescription>
            Validate your mnemonic seed phrase against the BIP39 standard
          </DialogDescription>
        </DialogHeader>

        <div className={`${hasInvalidWordsWithSuggestions ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}`}>
          {/* Left Column: Input and Main Validation Results */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="checksum-seed-phrase">Seed Phrase</Label>
              <Textarea
                id="checksum-seed-phrase"
                placeholder="Enter your mnemonic seed phrase..."
                value={inputSeedPhrase}
                onChange={handleInputChange}
                className="min-h-[120px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Enter the seed phrase you want to validate. Non-letter characters (quotes, commas, etc.) will be automatically removed.
              </p>
            </div>

            <Button onClick={validateChecksum} className="w-full" size="lg">
              Validate Checksum
            </Button>

            {validationResult.isValid !== null && (
              <div className="space-y-3 mt-4">
                <div
                  className={`p-4 rounded-lg border-2 ${
                    validationResult.isValid
                      ? "bg-green-50 dark:bg-green-950 border-green-500"
                      : "bg-red-50 dark:bg-red-950 border-red-500"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {validationResult.isValid ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                    <h3
                      className={`font-semibold ${
                        validationResult.isValid
                          ? "text-green-900 dark:text-green-100"
                          : "text-red-900 dark:text-red-100"
                      }`}
                    >
                      {validationResult.message}
                    </h3>
                  </div>
                </div>

                {!validationResult.isValid && validationResult.words.length > 0 && validationResult.invalidWordIndices.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Invalid Words (Highlighted in Red)</Label>
                    <div className="bg-muted p-4 rounded-md border-2 border-destructive/20">
                      <div className="flex flex-wrap gap-2">
                        {validationResult.words.map((word, index) => {
                          const isInvalid = validationResult.invalidWordIndices.includes(index);
                          return (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded font-mono text-sm ${
                                isInvalid
                                  ? "bg-destructive/20 text-destructive dark:bg-destructive/30 dark:text-destructive border-2 border-destructive"
                                  : "bg-background text-foreground border border-border"
                              }`}
                              title={isInvalid ? `Word ${index + 1}: "${word}" is not in BIP39 wordlist` : `Word ${index + 1}: ${word}`}
                            >
                              {index + 1}. {word}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {validationResult.details.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Validation Details</Label>
                    <div className="bg-muted p-3 rounded-md space-y-1">
                      {validationResult.details.map((detail, index) => (
                        <div key={index} className="text-sm font-mono">
                          • {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Right Column: Invalid Words & Suggested Replacements (only when hasInvalidWordsWithSuggestions) */}
          {hasInvalidWordsWithSuggestions && (
            <div className="space-y-4 border-l-2 border-border pl-6">
              {/* Checksum Explanation in right column */}
              {validationResult.checksumExplanation && (
                <div className="bg-blue-50 dark:bg-blue-950 border-2 border-blue-500 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                        Why Did the Checksum Fail?
                      </h4>
                      <p className="text-sm text-blue-900 dark:text-blue-100">
                        {validationResult.checksumExplanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Invalid Words & Suggested Replacements - Only show when there are invalid words */}
              {validationResult.invalidWordIndices.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Invalid Words & Suggested Replacements</Label>
                  <div className="space-y-2 max-h-[calc(90vh-12rem)] overflow-y-auto pr-2">
                    {validationResult.invalidWordIndices.map((index) => {
                      const suggestions = validationResult.wordSuggestions.get(index) || [];
                      return (
                        <div key={index} className="bg-muted p-3 rounded-md border border-destructive/20">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-sm font-semibold text-destructive">
                              Word {index + 1}: "{validationResult.words[index]}"
                            </span>
                            {suggestions.length > 0 ? (
                              <span className="text-xs text-muted-foreground">→ Suggested replacements:</span>
                            ) : (
                              <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                No close matches found
                              </span>
                            )}
                          </div>
                          {suggestions.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {suggestions.map((suggestion) => (
                                <Button
                                  key={suggestion}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleReplaceWord(index, suggestion)}
                                  className="font-mono text-xs"
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              This word is too different from BIP39 words. Please manually check your seed phrase backup or try the BIP39 wordlist.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Fix Suggestions in right column when there are invalid words */}
              {validationResult.fixSuggestions.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-500 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 text-sm">
                        How to Fix the Checksum
                      </h4>
                      <ul className="space-y-1">
                        {validationResult.fixSuggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm text-yellow-900 dark:text-yellow-100 flex items-start gap-2">
                            <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Auto-Generated Valid Seed Phrases in right column when there are invalid words */}
              {validationResult.autoFixedPhrases.length > 0 && (
                <div className="bg-green-50 dark:bg-green-950 border-2 border-green-500 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-3 flex-1">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 text-sm">
                        ✨ Corrected Seed Phrases (Valid Checksum)
                      </h4>
                      <p className="text-sm text-green-900 dark:text-green-100">
                        We found {validationResult.autoFixedPhrases.length} valid seed phrase{validationResult.autoFixedPhrases.length > 1 ? 's' : ''} similar to your input. Click to use one:
                      </p>
                      <div className="space-y-2">
                        {validationResult.autoFixedPhrases.map((phrase, index) => {
                          const phraseWords = phrase.split(" ");
                          const originalWords = validationResult.words;
                          
                          return (
                            <div key={index} className="bg-background/50 p-3 rounded-md border border-green-500/30">
                              <div className="flex items-start gap-3">
                                <div className="flex-1">
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {phraseWords.map((word, wordIdx) => {
                                      const isDifferent = word !== originalWords[wordIdx];
                                      return (
                                        <span
                                          key={wordIdx}
                                          className={`px-1.5 py-0.5 rounded font-mono text-xs ${
                                            isDifferent
                                              ? "bg-green-600 text-white dark:bg-green-500 font-semibold"
                                              : "text-foreground"
                                          }`}
                                          title={isDifferent ? `Changed from "${originalWords[wordIdx]}"` : "Unchanged"}
                                        >
                                          {word}
                                        </span>
                                      );
                                    })}
                                  </div>
                                  {phraseWords.some((word, wordIdx) => word !== originalWords[wordIdx]) && (
                                    <p className="text-xs text-muted-foreground">
                                      <span className="text-green-600 dark:text-green-400 font-semibold">Highlighted words</span> have been changed to fix the checksum
                                    </p>
                                  )}
                                </div>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleUseFixedPhrase(phrase)}
                                  className="flex-shrink-0 bg-green-600 hover:bg-green-700"
                                >
                                  Use This
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

