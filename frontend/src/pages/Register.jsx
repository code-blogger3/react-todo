import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const userRegisterApi = async (userRegisterData) => {
    const res = await axios.post("/api/auth/register", { ...userRegisterData });

    return res;
  };
  const { data, refetch, error } = useQuery({
    queryKey: ["user_register"],
    queryFn: () => userRegisterApi(userDetails),
    enabled: false,
    retry: 2,
  });

  function handleSignUp() {
    refetch();
    setUserDetails({ username: "", email: "", password: "" });
    navigate("/login");
  }
  function handleChange(e) {
    setUserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  }
  return (
    <div className="max-w-sm mx-auto  pt-[90px]">
      <Card className="w-[350px] mx-auto md:min-w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={userDetails.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={userDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={userDetails.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          {/* <Button variant="outline">Cancel</Button> */}
          <Button onClick={handleSignUp}>Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
