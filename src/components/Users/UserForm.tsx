// src/components/Users/UsersForm.tsx

import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { UserData } from "../../../app/types/user";
import PhoneField from "../../../app/components/PhoneInputField";
import EmailField from "../../../app/components/EmailInputField";
import UsernameField from "../../../app/components/UsernameInputField";
import { checkRolesAvailable } from "../../../app/lib/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
} from "@mui/material";
import { useSession } from "next-auth/react";
interface Role {
  id: number;
  name: string;
}
interface UsersFormProps {
  initialData?: UserData;
  onSubmit: (data: UserData) => void;
}

const UsersForm: React.FC<UsersFormProps> = ({ initialData, onSubmit }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const { data: session } = useSession();
  const methods = useForm<UserData>({
    defaultValues: initialData || {},
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = session?.accessToken as string;
        const rolesData = await checkRolesAvailable(token);

        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setRoles([]);
      }
    };

    fetchRoles();
  }, [session?.accessToken]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="last_name"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UsernameField />
          </Grid>
          <Grid item xs={12} sm={6}>
            <EmailField />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneField />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="zip_code"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Zip Code"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="address"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="country"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Country"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="user_role"
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error}>
                  <InputLabel>User Role</InputLabel>
                  <Select {...field} label="User Role">
                    {Array.isArray(roles) &&
                      roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 5 }}
              >
                {initialData ? "Update" : "Create"} User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default UsersForm;
