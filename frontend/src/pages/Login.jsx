// import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "@/redux/user/userSlice";

export function Login() {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLoginApi = async (userLoginData) => {
    const res = await axios.post("/api/auth/login", {
      ...userLoginData,
    });

    return res;
  };

  const { data, refetch, error } = useQuery({
    queryKey: ["user_login"],
    queryFn: () => userLoginApi(userDetails),
    enabled: false,
    select: (data) => {
      const result = data.data;
      return result;
    },
    // retry: 2,
  });

  function handleSignIn() {
    refetch();

    dispatch(signInUser(data.data.userDoc));
    setUserDetails({ username: "", email: "", password: "" });
    navigate("/");
  }

  // console.log(data.data.userDoc);
  // console.log(data.data);
  // console.log(data);

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
          <CardTitle className="text-2xl text-center">Login</CardTitle>
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
          <Button onClick={handleSignIn}>Sign In</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
