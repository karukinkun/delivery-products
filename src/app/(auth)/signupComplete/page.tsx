'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonMsg, pageMsg } from 'constants/messages';
import Link from 'next/link';

const SignupCompletePage = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{pageMsg.signupComplete.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-line">{pageMsg.signupComplete.description}</p>
      </CardContent>
      <CardFooter className="flex">
        <div className="flex w-full flex-col gap-2">
          <Button variant="outline" asChild>
            <Link href="/">{buttonMsg.toTop}</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupCompletePage;
