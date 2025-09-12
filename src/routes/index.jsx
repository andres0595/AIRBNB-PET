import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import Blog from "../components/Dashboard/Blog";
import Support from "../components/Support/Support";
import RegisterPage from "../pages/RegisterPage";
import OurServicesPage from "../pages/OurServicesPage";
// import AssignSubjects from "../components/AssignSubjects";
// import ClassmatesList from "../components/ClassmatesList";
// import StudentHistory from "../components/StudentHistory";

export const routes = [
  { path: "/", element: <LoginPage /> },
  {
    //element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },

      {
        path: "/ChangePassword",
        element: (
          // <ProtectedRoute adminOnly>
          <ChangePasswordPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/Blog",
        element: (
          // <ProtectedRoute adminOnly>
          <Blog />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/Support",
        element: (
          // <ProtectedRoute adminOnly>
          <Support />
          // </ProtectedRoute>
        ),
      },

      {
        path: "/Register",
        element: (
          // <ProtectedRoute adminOnly>
          <RegisterPage />
          // </ProtectedRoute>
        ),
      },

      {
        path: "/OurService",
        element: (
          // <ProtectedRoute adminOnly>
          <OurServicesPage />
          // </ProtectedRoute>
        ),
      },

      // {
      //   path: "/estudiantes/actualizar/:id",
      //   element: (
      //     <ProtectedRoute adminOnly>
      //       <StudentUpdate />
      //     </ProtectedRoute>
      //   ),
      // },

      // {
      //   path: "/estudiantes/:EstudianteId/materias",
      //   element: (
      //     <ProtectedRoute>
      //       <StudentSubjects />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/estudiantes/:EstudianteId/historial",
      //   element: (
      //     <ProtectedRoute adminOnly>
      //       <StudentHistory />
      //     </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: "/materias/asignar",
      //   element: (
      //     <ProtectedRoute>
      //       <AssignSubjects />
      //     </ProtectedRoute>
      //   ),
      // },
      // { path: "/compañeros", element: <ClassmatesList /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
