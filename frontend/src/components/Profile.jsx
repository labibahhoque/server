import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Book, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const StudentProfile = () => {


  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  
return (
    <div className="min-h-screen overflow-y-auto bg-gray-100" >
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            {/*<Avatar className="h-20 w-20">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>*/}
            <div>
              <h3 className="font-medium text-xl">{user?.fullname}</h3>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
        </div>

        <div className="my-5">
          <h3 className="font-bold text-lg">CGPA</h3>
          <p className="text-gray-600">{user?.profile?.CGPA ?? "NA"}</p>
        </div>

        <UpdateProfileDialog open={open} setOpen={setOpen} />
        
      </div>
    </div>
  );
};

export default StudentProfile;
