"use client";
import axios, { HttpStatusCode } from "axios";

export interface HP_info {
  cnes: string;
  estado: string;
  cidade: string;
  razao_social: string;
  nome_fantasia: string;
}

//MUDAR INTERFACE
export interface LD_info {
  id: number;
  cnes: string;
  data_fim: string;
  data_inicio: string;
  ready: boolean;
}

export interface USR_info {
  email: string;
  senha: string;
  admin: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const local_backend = "http://localhost:3001";

const remote_backend = "https://susbacktest-copy-production.up.railway.app";

const backendURL = remote_backend;

// USAR BARRA NO INÍCIO DA STRING
function get_back_url(page_relative_path: string): string {
  return `${backendURL}${page_relative_path}`;
}

export function pdf_download_url(id: string | number): string {
  return get_back_url(`/laudoPdf${id}`);
}

export function full_SIA_download_url(id: string | number): string {
  return get_back_url(`/laudoSiaCsv${id}`);
}

export function full_SIH_download_url(id: string | number): string {
  return get_back_url(`/laudoSihCsv${id}`);
}

//USAR A VERSÃO MOCKADA
// function bearer_token(): string {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("no token found");
//   }

//   return `Bearer ${token}`;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mock_bearer_token(): string {
  return "token mockado";
}

//USAR A VERSÃO MOCKADA
export async function login_request(values: { email: string; senha: string }) {
  const result = await axios.post(get_back_url("/auth/login"), values);
  console.log(result.data);

  if (
    result.status === HttpStatusCode.Created &&
    "user" in result.data &&
    "admin" in result.data
  ) {
    localStorage.setItem("token", result.data.user);
    localStorage.setItem("admin", result.data.admin ? "true" : "false");
    return;
  }

  throw new Error(`${result.status}`);
}

export async function mock_login_request(values: {
  email: string;
  senha: string;
}) {
  if (values.email != "a") {
    return Promise<null>;
  }

  throw new Error("err");
}

export async function get_hospitals_request() {
  const result = await axios.get(get_back_url("/allHosp"), {
    headers: { Authorization: mock_bearer_token() },
  });

  if (result.status != HttpStatusCode.Ok) {
    throw new Error(`${result.status}`);
  }

  const data: HP_info[] = result.data;

  return data;
}

export async function get_single_hospital(cnes: string) {
  console.log(`/hosp${cnes}`);
  const result = await axios.get(get_back_url(`/hosp${cnes}`), {
    headers: { Authorization: mock_bearer_token() },
  });

  if (result.status != HttpStatusCode.Ok) {
    throw new Error(`${result.status}`);
  }

  const data: HP_info = result.data;
  return data;
}

export async function get_laudos(cnes: string) {
  const result = await axios.get(get_back_url(`/laudosHosp${cnes}`), {
    headers: { Authorization: mock_bearer_token() },
  });

  if (result.status != HttpStatusCode.Ok) {
    throw new Error(`${result.status}`);
  }

  const data: LD_info[] = result.data;
  console.log(data);
  return data;
}

// CORRIGIR INTERFACE
export interface MK_LD_info {
  cnes: string;
  data_inicio: string;
  data_fim: string;
  fim_correcao: string;
  n_processo: string;
  distribuicao: string;
  citacao: string;
  sistema: string;
  metodo: string;
}

// TUDO CERTO
export async function mock_make_laudo_request(info: LD_info) {
  if (info.data_fim == "a") {
    throw new Error("cidade errada");
  }

  return Promise<null>;
}

export async function make_laudo_request(info: MK_LD_info) {
  console.log("requisição de criação de laudo: ", info);
  const result = await axios.post(get_back_url("/makeLaudo"), info, {
    headers: { Authorization: mock_bearer_token() },
  });

  if (result.status != HttpStatusCode.Created) {
    throw new Error(`${result.status}`);
  }

  return Promise<null>;
}

// TUDO CERTO
export async function mock_list_all_users(): Promise<USR_info[]> {
  return Promise.resolve([
    { email: "John Doe", senha: "b", admin: true },
    { email: "Jane Doe", senha: "a", admin: false },
  ]);
}

// USAR VERSÃO MOCKADA
export async function list_all_users_request(): Promise<USR_info[]> {
  const result = await axios.get(get_back_url("/auth/usuarios"), {
    headers: { Authorization: mock_bearer_token() },
  });

  const data: USR_info[] = result.data;
  return data;
}

// CORRIGIER ENDPOINT
export async function delete_laudo_request(id: number) {
  await axios.delete(get_back_url(`/laudo${id}`), {
    headers: { Authorization: mock_bearer_token() },
  });
  return Promise<null>;
}

// CORRIGIR ENDPOINT
export async function remove_hospital_request(cnes: string) {
  console.log(`hosp${cnes}`);
  await axios.delete(get_back_url(`/hosp${cnes}`), {
    headers: { Authorization: mock_bearer_token() },
  });
  return Promise<null>;
}

// IGNORAR
export async function mock_reset_server_request() {}

// USAR VERSÃO MOCKADA
export async function remove_user_request(email: string) {
  await axios.delete(get_back_url(`/auth/usuarios/email/${email}`), {
    headers: { Authorization: mock_bearer_token() },
  });
  return Promise<null>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function mock_remove_user_request(email: string) {}

// USAR VERSÃO MOCKADA
export async function add_user_request(info: USR_info) {
  await axios.post(get_back_url(`/auth/usuarios`), info, {
    headers: { Authorization: mock_bearer_token() },
  });
  return Promise<null>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function mock_add_user_request(info: USR_info) {}

// USAR VERSÃO MOCKADA
export async function give_admin_request(email: string, admin: boolean) {
  await axios.post(
    get_back_url(`/auth/giveadmin${email}`),
    { admin: admin },
    { headers: { Authorization: mock_bearer_token() } },
  );
  return Promise<null>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function mock_give_admin_request(email: string, admin: boolean) {}

// IGNORAR
export async function reset_server_request() {}

export async function add_hospital_request(data: {
  nome_fantasia: string;
  razao_social: string;
  cidade: string;
  cnes: string;
  estado: string;
}) {
  console.log("batata");
  await axios.post(get_back_url(`/hosp`), data, {
    headers: { Authorization: mock_bearer_token() },
  });
  return Promise<null>;
}
