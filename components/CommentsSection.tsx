"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FaRegComments, FaTrash, FaPencil } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  user?: {
    id: string;
    email: string;
  };
}

interface CommentsSectionProps {
  postSlug: string;
}

export default function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchComments();
    fetchUser();
  }, [postSlug]);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const fetchComments = async () => {
    setFetching(true);
    try {
      const response = await fetch(`/api/posts/${postSlug}/comments`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/signIn");
      return;
    }

    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${postSlug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments([data, ...comments]);
        setNewComment("");
      } else {
        const error = await response.json();
        if (response.status === 401) {
          router.push("/signIn");
        } else {
          console.error("Error adding comment:", error);
          alert("Failed to add comment. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const response = await fetch(`/api/posts/${postSlug}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setComments(comments.filter((c) => c.id !== commentId));
      } else {
        console.error("Error deleting comment");
        alert("Failed to delete comment. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const handleEdit = async (commentId: string) => {
    if (!editContent.trim()) {
      setEditingId(null);
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postSlug}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (response.ok) {
        const updated = await response.json();
        setComments(
          comments.map((c) => (c.id === commentId ? { ...c, ...updated } : c))
        );
        setEditingId(null);
        setEditContent("");
      } else {
        console.error("Error updating comment");
        alert("Failed to update comment. Please try again.");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-2 mb-6">
        <FaRegComments className="text-mainColor" size={20} />
        <h3 className="text-xl font-semibold text-foreground">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Add Comment Form */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="min-h-[100px] mb-3"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !newComment.trim()}>
            {loading ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground text-sm mb-3">
            Please sign in to leave a comment.
          </p>
          <Button onClick={() => router.push("/signIn")} variant="outline">
            Sign In
          </Button>
        </div>
      )}

      {/* Comments List */}
      {fetching ? (
        <div className="text-center py-8 text-muted-foreground">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => {
            const isOwner = currentUser?.id === comment.user_id;
            const isEditing = editingId === comment.id;

            return (
              <div
                key={comment.id}
                className="p-4 bg-card rounded-lg border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {comment.user?.email 
                          ? comment.user.email.split("@")[0] 
                          : `User ${comment.user_id.slice(0, 8)}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(comment.created_at)}
                        {comment.updated_at !== comment.created_at && " (edited)"}
                      </p>
                    </div>
                  {isOwner && !isEditing && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditContent(comment.content);
                        }}
                        className="text-muted-foreground hover:text-mainColor transition-colors"
                        aria-label="Edit comment"
                      >
                        <FaPencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                        aria-label="Delete comment"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  )}
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(comment.id)}
                        disabled={!editContent.trim()}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setEditContent("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-foreground whitespace-pre-wrap">{comment.content}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

