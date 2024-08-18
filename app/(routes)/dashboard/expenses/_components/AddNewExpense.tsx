'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { useState } from "react";

function AddNewExpense({user,budgetID})  {
   
  

  const [name, setName] = useState<string | undefined>(); 
  const [amount, setAmount] = useState<string>(); 
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!name || !amount || !user) {
      toast({
        title: "Error",
        description: "Please provide all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post('/api/createexpense', {
        name,
        amount: parseInt(amount, 10),
        createdBy:user, // or whatever user identifier you use
        budgetID,
      });

      toast({
        title: "Success",
        description: "Expense added successfully!",
      });

      // Optionally, reset form fields
      setName(undefined);
      setAmount(undefined);
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button> +Add New Expense</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Expense 💰</DialogTitle>
            <DialogDescription>
              Add Your Expense here . Click save when you're done ✅.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" >
                 Name
              </label>
              <Input onChange={(e) => {setName(e.target.value)}} id="name" placeholder=" Gaadi-Ghoda"  className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Amount💲
              </label>
              <Input onChange={(e) => {setAmount(e.target.value)}} id="username" placeholder="1 billion USD" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
          <DialogClose asChild>
          <Button disabled = {!(name&&amount)} onClick={() => handleSubmit()} type="submit">Add Expense</Button>
          </DialogClose>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewExpense