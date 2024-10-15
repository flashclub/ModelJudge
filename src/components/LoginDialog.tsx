"use client";
import * as React from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  message?: string;
}

export default function LoginDialog({
  isOpen,
  onOpenChange,
  message,
}: LoginDialogProps) {
  const t = useTranslations("LoginDialog");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        {message && <p className="text-sm text-gray-600 mb-4">{message}</p>}
        <div className="space-y-4">
          <Button onClick={() => signIn("google")} className="w-full">
            Google
          </Button>
          <Button onClick={() => signIn("github")} className="w-full">
            Github
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
