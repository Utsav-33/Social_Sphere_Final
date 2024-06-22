import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const regsiterModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    regsiterModal.onOpen();
  }, [isLoading, regsiterModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      toast.success("Logged in successfully");

      loginModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Wrong Credentials");
    } finally {
      setIsLoading(false);
    }
  }, [loginModal,email,password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        disabled={isLoading}
      />
    </div>
  );

  const footerSection = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using SocialSphere?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          {" "}
          Create an account.
        </span>
      </p>
    </div>
  );
  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        actionLabel="Sign In"
        title="Login"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerSection}
      />
    </div>
  );
};

export default LoginModal;
