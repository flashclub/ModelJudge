"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
export default function InputApiKey({ cookies }: { cookies: any }) {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [isApiKeySaved, setIsApiKeySaved] = useState(false);
  const { toast } = useToast();
  const saveApiKey = () => {
    setIsApiKeySaved(true);
    setIsApiKeyDialogOpen(false);
    localStorage.setItem("apiKey", apiKey);
    // 设置cookie
    document.cookie = `api_key=${apiKey}; path=/; max-age=31536000; SameSite=Strict; Secure`;
    // 刷新页面以使cookie生效
    // window.location.reload();
    toast({
      title: "API key已保存",
      description: "下次访问无需再次输入",
    });
  };
  return (
    <>
      <Button variant="outline" onClick={() => setIsApiKeyDialogOpen(true)}>
        点击输入API key
      </Button>

      <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>输入API key</DialogTitle>
          </DialogHeader>
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="请输入API key"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsApiKeyDialogOpen(false)}
            >
              关闭
            </Button>
            <Button onClick={saveApiKey}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
