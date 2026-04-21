import { Navigate, Outlet } from "react-router-dom";

import { useGetUserMe } from "@/hooks/useGetUserMe";

const ProtectedRoute = () => {
  const { data: userMe, isLoading } = useGetUserMe();

  if (isLoading) {
    return (
      <div>
        Loading
      </div>
    )
  };

  if (!isLoading && !userMe) {
    return <Navigate to="/?auth=login" replace />
  }

  if (userMe) {
    return <Outlet />
  }
};

export { ProtectedRoute };