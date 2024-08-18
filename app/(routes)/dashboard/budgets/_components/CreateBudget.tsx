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


import React, { useState } from "react";

function CreateBudget() {
  const {user} = useUser();
  

  const [name, setName] = useState<string | undefined>(); 
  const [amount, setAmount] = useState<string>(); 
  const { toast } = useToast()


  const handleSubmit = async () => {
    

    if (!name || amount === undefined) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await axios.post('/api/createbudget', {
        name,
        amount,
        createdBy: user?.primaryEmailAddress?.emailAddress
      });

      if (response.status === 200) {
        toast({
          description: "Congrats! Budget Created",
         variant: "success"
        })
        
      } else {
        console.error("Failed to create budget");
        alert("Error creating budget. Please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };


  
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button> + Create Budget</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Budget 💰</DialogTitle>
            <DialogDescription>
              Add Your budget💵 here . Click save when you're done ✅.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" >
                 Name
              </label>
              <Input onChange={(e) => {setName(e.target.value)}} id="name" placeholder=" Popatlal"  className="col-span-3" />
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
          <Button disabled = {!(name&&amount)} onClick={() => handleSubmit()} type="submit">Create Budget</Button>
          </DialogClose>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
