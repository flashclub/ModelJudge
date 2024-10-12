"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useGoogleOneTapLogin } from "@react-oauth/google";

const GoogleOneTapLogin = () => {
  const { data: session, status } = useSession();
  const [showOneTap, setShowOneTap] = useState(false);

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      signIn("google", { credential: credentialResponse.credential });
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      setShowOneTap(true);
    } else {
      setShowOneTap(false);
      // @ts-ignore
      window.google?.accounts.id.cancel();
    }
  }, [status]);

  if (!showOneTap) return null;

  return (
    <div
      id="g_id_onload"
      data-auto_select="true"
      data-skip_prompt_cookie="true"
    ></div>
  );
};

export default GoogleOneTapLogin;
