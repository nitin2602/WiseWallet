// @ts-nocheck
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Router, useRouter } from "next/router";

function Alert({ id }) {
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/deletebudget/${id}`);
      if (response.status === 200) {
        router.push('/dashboard/budgets');
        toast({
          description: " Budget Deleted",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
      alert("Failed to delete the budget.");
    }
  };

  return (
    <AlertDialog >
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Budget</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Budget and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className=" bg-red-500">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
