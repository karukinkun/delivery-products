import {
  associateWebAuthnCredential,
  deleteWebAuthnCredential,
  listWebAuthnCredentials,
} from 'aws-amplify/auth';

export type PasskeyCredential = {
  credentialId: string;
  friendlyCredentialName?: string;
  relyingPartyId?: string;
  createdAt?: Date;
};

export type PasskeyCredentialResponse = PasskeyCredential[];

export async function getPasskeysClientApi(): Promise<PasskeyCredentialResponse> {
  const result = await listWebAuthnCredentials();

  const out: PasskeyCredential[] = [];
  for (const credential of result.credentials ?? []) {
    const credentialId = credential.credentialId;
    if (credentialId === undefined || credentialId === '') {
      continue;
    }
    out.push({
      credentialId,
      friendlyCredentialName: credential.friendlyCredentialName,
      relyingPartyId: credential.relyingPartyId,
      createdAt: credential.createdAt,
    });
  }
  return out;
  //   return result.credentials.map((credential) => ({
  //     credentialId: credential.credentialId,
  //     friendlyCredentialName: credential.friendlyCredentialName,
  //     relyingPartyId: credential.relyingPartyId,
  //     createdAt: credential.createdAt,
  //   }));
}

export async function registerPasskeyClientApi(): Promise<void> {
  await associateWebAuthnCredential();
}

export async function removePasskeyClientApi(credentialId: string): Promise<void> {
  await deleteWebAuthnCredential({
    credentialId,
  });
}
