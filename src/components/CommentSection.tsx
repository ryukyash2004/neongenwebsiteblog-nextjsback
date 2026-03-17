import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// The API fetcher function
const postComment = async ({ postId, content }: { postId: string, content: string }) => {
  const token = localStorage.getItem("site_token");

  if (!token) {
    throw new Error("You must be logged in to comment.");
  }

  const response = await fetch(`/api/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Attach the token here
    },
    body: JSON.stringify({ content }),
  });

  if (response.status === 401) {
    localStorage.removeItem("site_token");
    localStorage.removeItem("site_user");
    window.location.href = "/login"; // Or trigger your login modal
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to post comment");
  }

  return response.json();
};

// Inside your component
export const CommentForm = ({ postId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      toast.success("Comment posted!");
      // Refresh the comments list immediately
      queryClient.invalidateQueries({ queryKey: ["comments", postId] }); 
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onSubmit = (content: string) => {
    mutation.mutate({ postId, content });
  };

  // ... render your form and pass onSubmit ...
}