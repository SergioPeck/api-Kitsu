import * as admin from 'firebase-admin';

const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
if (!base64) {
  throw new Error('Missing env var: FIREBASE_SERVICE_ACCOUNT_BASE64');
}

let serviceAccount: unknown;
try {
  const json = Buffer.from(base64, 'base64').toString('utf8');
  serviceAccount = JSON.parse(json);
} catch (err: unknown) {
  const msg = err && typeof err === 'object' && 'message' in err ? (err as Error).message : String(err);
  throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64: ' + msg);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export { admin };
