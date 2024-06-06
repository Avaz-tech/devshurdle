"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Container from "@components/Container";
//================================================================================================================
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

//================================================================================================================
// define form schema
const FormSchema = z.object({
  username: z.string().min(3, {
    message: "Name must be at leat 3 characters",
  }),
  email: z.string().email(),
  message: z.string().min(20, {
    message: "Message must be at least 20 characters",
  }),
});
//================================================================================================================

const ContactPage = () => {
  //================================================================================================================
  // define form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });
  //================================================================================================================
  // handle form submit
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };
  //================================================================================================================
  // Jsx return
  return (
    <Container className="h-[79vh]  flex justify-center items-center max-w-full ">
      <div className="w-full max-w-[600px] h-full max-h-[560px] p-8 rounded-lg shadow-md border border-mainColor">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-mainColor"
          >
            {/* ----------------------- Usename Input ---------------- */}

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl className="border-mainColor">
                    <Input type="string" placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ----------------------- Email Input ---------------- */}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl className="border-mainColor">
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ----------------------- Message Input ---------------- */}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl className="border-mainColor">
                    <Textarea
                      className="min-h-[180px] "
                      placeholder="Type you message here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ----------------------- Submit Button ---------------- */}

            <Button
              className="w-full bg-mainColor hover:opacity-80 hover:bg-mainColor"
              type="submit"
            >
              Submit
            </Button>

            {/* ----------------------- End of Form items ---------------- */}
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default ContactPage;
