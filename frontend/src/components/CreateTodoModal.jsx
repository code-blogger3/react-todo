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
import NewTodo from "./NewTodo";
import { useState } from "react";

export function CreateTodoModal() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="pt-5 ml-14">
      <AlertDialog open={openModal}>
        <AlertDialogTrigger asChild>
          <Button
            variant="default"
            className="h-12 w-28 text-lg font-medium"
            onClick={() => setOpenModal(true)}
          >
            Add Todo
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <NewTodo setOpenModal={setOpenModal} modal />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenModal(false)}>
              Cancel
            </AlertDialogCancel>
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
//    <AlertDialogHeader>
//      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//      <AlertDialogDescription>
//        This action cannot be undone. This will permanently delete your account
//        and remove your data from our servers.
//      </AlertDialogDescription>
//    </AlertDialogHeader>;
