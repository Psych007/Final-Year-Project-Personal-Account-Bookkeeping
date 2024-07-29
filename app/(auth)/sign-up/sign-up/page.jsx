// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return <SignUp />;
// }

// // pages/signup.js
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <SignUp />
      </div>
    </div>
  );
}
