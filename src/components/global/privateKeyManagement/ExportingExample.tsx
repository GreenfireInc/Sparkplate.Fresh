// Example usage of the Exporting component
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Exporting } from './exporting';

interface ExportingExampleProps {
  privateKey: string;
  publicKey?: string;
  address?: string;
  currency?: string;
}

export const ExportingExample = ({
  privateKey,
  publicKey,
  address,
  currency = 'BTC'
}: ExportingExampleProps) => {
  const [showExportDialog, setShowExportDialog] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setShowExportDialog(true)}
        className="mt-4"
        variant="outline"
      >
        Export Private Key
      </Button>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Export Private Key</DialogTitle>
          </DialogHeader>
          
          <Exporting
            privateKey={privateKey}
            publicKey={publicKey}
            address={address}
            currency={currency}
            onClose={() => setShowExportDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExportingExample;
