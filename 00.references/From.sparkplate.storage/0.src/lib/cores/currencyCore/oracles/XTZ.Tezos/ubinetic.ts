// Ubinetic Oracle - Secure API Oracle Service
// Type: API Oracle Service
// Blockchain: Tezos (XTZ)

export const ubineticOracle = {
  name: "Ubinetic",
  blockchain: "Tezos (XTZ)",
  type: "API Oracle Service",
  description: "Oracle service for off-chain data; focuses on secure API pulls for payments, IoT, and general API integration with Tezos smart contracts.",
  
  url: "https://ubinetic.com/",
  docs: "https://ubinetic.com/",
  
  api: {
    documentation: "https://ubinetic.com/",
    requiresApiKey: true,
    customIntegration: true,
  },
  
  sdk: {
    npm: "@taquito/taquito",
    installation: "npm install @taquito/taquito axios",
    documentation: "https://ubinetic.com/",
    features: [
      "Secure API data pulls",
      "Payment API integration",
      "IoT sensor data",
      "Custom API endpoints",
      "General off-chain data",
    ],
  },
  
  integration: {
    example: `
// Ubinetic Oracle Integration Example
import axios from 'axios';
import { TezosToolkit } from '@taquito/taquito';

const UBINETIC_API_BASE = 'https://api.ubinetic.com'; // Example base URL
const UBINETIC_API_KEY = process.env.UBINETIC_API_KEY;
const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');

// Generic API data fetch
async function fetchAPIData(endpoint: string, params?: any) {
  try {
    const response = await axios.get(\`\${UBINETIC_API_BASE}\${endpoint}\`, {
      headers: {
        'Authorization': \`Bearer \${UBINETIC_API_KEY}\`,
        'Content-Type': 'application/json'
      },
      params
    });
    
    console.log('API Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching API data:', error);
    throw error;
  }
}

// Fetch payment data
async function fetchPaymentData(transactionId: string) {
  try {
    const response = await axios.get(
      \`\${UBINETIC_API_BASE}/payments/\${transactionId}\`,
      {
        headers: {
          'Authorization': \`Bearer \${UBINETIC_API_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Payment Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment data:', error);
    throw error;
  }
}

// Fetch IoT sensor data
async function fetchIoTData(deviceId: string, metric: string) {
  try {
    const response = await axios.get(
      \`\${UBINETIC_API_BASE}/iot/devices/\${deviceId}/metrics/\${metric}\`,
      {
        headers: {
          'Authorization': \`Bearer \${UBINETIC_API_KEY}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(\`IoT Data for device \${deviceId}:\`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching IoT data:', error);
    throw error;
  }
}

// Push data to Tezos oracle contract
async function pushDataToOracle(
  oracleAddress: string,
  dataKey: string,
  dataValue: any,
  wallet: any
) {
  try {
    const contract = await Tezos.contract.at(oracleAddress);
    
    // Encode data appropriately
    const encodedValue = JSON.stringify(dataValue);
    
    const op = await contract.methods
      .update_data(dataKey, encodedValue, Math.floor(Date.now() / 1000))
      .send({ source: wallet.address });
    
    await op.confirmation();
    
    console.log(\`Data pushed to oracle: \${dataKey}\`);
    console.log('Transaction hash:', op.hash);
    
    return op;
  } catch (error) {
    console.error('Error pushing data to oracle:', error);
    throw error;
  }
}

// Verify payment and push to blockchain
async function verifyAndPushPayment(
  transactionId: string,
  oracleAddress: string,
  wallet: any
) {
  try {
    // Fetch payment data from Ubinetic
    const paymentData = await fetchPaymentData(transactionId);
    
    // Verify payment status
    if (paymentData.status === 'completed') {
      // Push verified payment to Tezos oracle
      await pushDataToOracle(
        oracleAddress,
        \`payment_\${transactionId}\`,
        {
          status: paymentData.status,
          amount: paymentData.amount,
          timestamp: paymentData.timestamp
        },
        wallet
      );
      
      console.log('Payment verified and pushed to oracle');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error verifying and pushing payment:', error);
    throw error;
  }
}

// Monitor IoT device and update oracle
async function monitorIoTDevice(
  deviceId: string,
  metric: string,
  oracleAddress: string,
  wallet: any,
  interval: number = 60000 // 1 minute
) {
  setInterval(async () => {
    try {
      // Fetch IoT data
      const iotData = await fetchIoTData(deviceId, metric);
      
      // Push to oracle if data is valid
      if (iotData.value !== null && iotData.value !== undefined) {
        await pushDataToOracle(
          oracleAddress,
          \`iot_\${deviceId}_\${metric}\`,
          {
            value: iotData.value,
            unit: iotData.unit,
            timestamp: iotData.timestamp
          },
          wallet
        );
        
        console.log(\`IoT data updated: \${deviceId}/\${metric} = \${iotData.value}\`);
      }
    } catch (error) {
      console.error('Error in IoT monitoring:', error);
    }
  }, interval);
}

// Custom API integration
async function integrateCustomAPI(
  apiUrl: string,
  oracleAddress: string,
  dataKey: string,
  wallet: any
) {
  try {
    // Fetch from custom API
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': \`Bearer \${UBINETIC_API_KEY}\`
      }
    });
    
    // Push to Tezos oracle
    await pushDataToOracle(
      oracleAddress,
      dataKey,
      response.data,
      wallet
    );
    
    console.log(\`Custom API data integrated: \${dataKey}\`);
    return response.data;
  } catch (error) {
    console.error('Error integrating custom API:', error);
    throw error;
  }
}

// Usage
// fetchAPIData('/data/endpoint').then(data => console.log('API Data:', data));
// fetchPaymentData('txn_123456').then(data => console.log('Payment:', data));
// fetchIoTData('device_001', 'temperature').then(data => console.log('IoT Data:', data));
    `,
  },
  
  socialMedia: {
    linkedin: "https://www.linkedin.com/company/ubinetic/",
    website: "https://ubinetic.com/",
  },
  
  features: {
    secureAPI: true,
    paymentIntegration: true,
    iotSupport: true,
    customEndpoints: true,
    offChainData: true,
  },
  
  supportedData: [
    "General APIs (payments, IoT)",
    "Payment verification data",
    "IoT sensor readings",
    "Custom API endpoints",
    "Off-chain business data",
  ],
  
  notes: [
    "Active oracle service for Tezos",
    "Focuses on secure API pulls",
    "Payment API integration support",
    "IoT sensor data integration",
    "Custom API endpoint support",
    "Secure data transmission",
    "API key required",
    "Custom integration available",
    "Suitable for enterprise use cases",
    "Contact Ubinetic for specific integration details",
  ],
  
  useCases: [
    "Payment verification for smart contracts",
    "IoT device data integration",
    "Supply chain tracking",
    "Business API integration",
    "Event-driven smart contract triggers",
    "Real-world asset tracking",
  ],
  
  integration_notes: [
    "Contact Ubinetic for API documentation",
    "Custom integration setup required",
    "API key authentication",
    "Flexible data format support",
    "Enterprise-grade security",
  ],
};

