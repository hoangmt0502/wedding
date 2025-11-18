import React, { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Slide,
  Autocomplete,
  Snackbar,
  createTheme,
  ThemeProvider,
  Container,
  Avatar,
  Grid2,
  SnackbarCloseReason,
  alpha,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";
import { useResponsive } from "../hooks/useResponsive";
import CONFIG from "../config";
import locales from "../locales";
import { TDropdownOption } from "../interfaces/common";
import { postSelectedPharmacy } from "../services/userService";
import { useAlertModal } from "../context/AlertModal";
import MuiAlert from "@mui/material/Alert";
import bg from '../assets/bg-login.jpg';
import img from '../assets/img-login.png';
import logo from '../assets/logo.png';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ERegExp } from "../enums/common";

const Alert = forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { isLargeDesktop, isMobile } = useResponsive();
  const { showAlert } = useAlertModal();
  const {
    user,
    loginWithEmail,
    setUser,
    setPermissions,
    setIsPermissionsLoaded,
  } = useAuth();
  const { common: t_common, login } = locales["vi"];
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";

  const [step, setStep] = useState<"login" | "select-branch">("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [selectPharmacies, setSelectPharmacies] = useState<TDropdownOption[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState<TDropdownOption | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<LoginForm>({
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (user?.id) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, token);
    localStorage.setItem("sidebarOpen", JSON.stringify(isLargeDesktop));
    setIsPermissionsLoaded(true);
  };

  const onSubmit: SubmitHandler<LoginForm> = async (values) => {
    setError("");
    setLoading(true);
    try {
      const res = await loginWithEmail(values.email, values.password);
      if (!res?.token || !res?.user) {
        throw new Error(login.errors.invalidServerResponse);
      }
      setPermissions(res.permissions || []);
      handleLoginSuccess(res.token);
      if (res.status === 428) {
        const options = (res?.pharmacies || [])?.map((pharmacy) => ({
          label: pharmacy.name ?? "",
          value: pharmacy.uuid ?? "",
        }));
        setSelectPharmacies(options);
        setStep('select-branch');
      }
      else {
        setUser({ ...res.user, active_pharmacy_id: res.active_pharmacy_id ?? null });
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || login.errors.invalidCredentials;
      setError(message);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBranchSelect = async () => {
    if (!selectPharmacies) return;
    try {
      const res = await postSelectedPharmacy({ pharmacy_id: `${selectedPharmacy?.value ?? ""}` })
      setUser(res.user);
      navigate("/", { replace: true });
    } catch (error: any) {
      showAlert("error", t_common.dialogError, error?.response?.data?.message);
    }
  };

  const handleClose = (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props: any) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid2 container>
            <Grid2 size={{ xs: 12, sm: 12, lg: 6 }}>
              <Box
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  height: "100%",
                }}
              ></Box>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, lg: 6 }}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#3b33d5",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container sx={{ display: "flex", alignItems: "center", justifyContent: 'center', flexDirection: "column", height: '100%', overflow: "hidden" }}>
                    <Box sx={{
                      display: "flex",
                      flexDirection: "column",
                      justiffyContent: "center",
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                      <Avatar
                        sx={{ height: 100, width: 100, mb: "16px", bgcolor: "#ffffff" }}
                      >
                        <img src={logo} alt="login" width={100} height={100} />
                      </Avatar>
                      <Typography component="h1" variant="h4" fontWeight={600}>
                        {login.title}
                      </Typography>
                    </Box>
                    <Slide
                      direction="right"
                      in={step === "login"}
                      mountOnEnter
                      unmountOnExit
                      timeout={300}
                    >
                      <Box
                        component="form"
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 2 }}
                      >
                        <Grid2 container spacing={3}>
                          <Grid2 size={{ xs: 12 }} sx={{ ml: "3em", mr: "3em" }}>
                            <Controller
                              name="email"
                              control={control}
                              rules={{
                                required: login.emailRequired,
                                pattern: {
                                  value: ERegExp.EMAIL,
                                  message: login.emailWarning ?? login.emailRequired,
                                },
                              }}
                              render={({ field, fieldState }) => (
                                <TextField
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value.trim())}
                                  label={login.email}
                                  placeholder={login.emailPlaceholder}
                                  type="text"
                                  inputMode="email"
                                  autoComplete="off"
                                  autoCorrect="off"
                                  autoCapitalize="none"
                                  value={field.value}
                                  fullWidth
                                  required
                                  size="medium"
                                  variant="outlined"
                                  error={!!errors.email}
                                  helperText={fieldState.error?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Email sx={{ color: "#fff" }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: alpha('#fff', 0.7),
                                        borderWidth: 1,
                                      },
                                      '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                      },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                      },
                                      '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: '#f44336' },
                                      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
                                    },
                                    '& .MuiOutlinedInput-input:autofill': {
                                      WebkitBoxShadow: '0 0 0 100px #3b33d5 inset !important',
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#fff',
                                    }
                                  }}
                                />
                              )}
                            />
                          </Grid2>
                          <Grid2 size={{ xs: 12 }} sx={{ ml: "3em", mr: "3em" }}>
                            <Controller
                              name="password"
                              control={control}
                              rules={{
                                required: login.passwordRequired,
                              }}
                              render={({ field, fieldState }) => (
                                <TextField
                                  {...field}
                                  label={login.password}
                                  placeholder={login.passwordPlaceholder}
                                  type={showPassword ? "text" : "password"}
                                  autoComplete="current-password"
                                  fullWidth
                                  required
                                  size="medium"
                                  variant="outlined"
                                  value={field.value}
                                  error={!!fieldState.error}
                                  helperText={fieldState.error?.message}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Lock sx={{ color: "#fff" }} />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword((v) => !v)} edge="end">
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: alpha('#fff', 0.7),
                                        borderWidth: 1,
                                      },
                                      '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                      },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                      },
                                      '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: '#f44336' },
                                      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
                                    },
                                    '& .MuiOutlinedInput-input:autofill': {
                                      WebkitBoxShadow: '0 0 0 100px #3b33d5 inset !important',
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: '#fff',
                                    }
                                  }}
                                />
                              )}
                            />
                          </Grid2>
                          <Grid2 size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              disabled={loading}
                              size={'large'}
                              sx={{
                                mr: "20px",
                                borderRadius: 28,
                                color: "#ffffff",
                                minWidth: "170px",
                                backgroundColor: "#FF9A01",
                              }}
                            >
                              {loading ? (
                                <CircularProgress size={24} color="inherit" />
                              ) : (
                                login.login
                              )}
                            </Button>
                          </Grid2>
                        </Grid2>
                      </Box>
                    </Slide>
                    <Slide
                      direction="left"
                      in={step === "select-branch"}
                      mountOnEnter
                      unmountOnExit
                      timeout={500}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                        display="flex"
                        flexDirection="column"
                        justifyContent={'center'}
                        gap={2}
                      >
                        <Autocomplete
                          options={selectPharmacies}
                          getOptionLabel={(option) => option.label}
                          value={selectedPharmacy}
                          onChange={(_, value) => setSelectedPharmacy(value)}
                          renderInput={(params) => (
                            <TextField {...params} label={login.selectPharmacy} fullWidth />
                          )}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={!selectedPharmacy}
                          onClick={handleBranchSelect}
                          sx={{
                            paddingY: 1.5
                          }}
                        >
                          {loading ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            login.continue
                          )}
                        </Button>
                      </Box>
                    </Slide>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </div>
    </>
  );
}
