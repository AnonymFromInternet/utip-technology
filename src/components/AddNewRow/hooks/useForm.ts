import { useState } from "react";

export const useForm = (defaultValue: string = "") => {
  const [postId, setPostId] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  return {
    postId,
    setPostId,
    id,
    setId,
    name,
    setName,
    email,
    setEmail,
    body,
    setBody,
    isMessageVisible,
    setIsMessageVisible,
  };
};
