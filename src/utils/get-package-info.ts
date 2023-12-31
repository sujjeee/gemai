import packageJson from "package-json";
import type { PackageJson } from "type-fest";

export async function getPackageInfo() {
  const packageInfo = await packageJson("gemai");
  return packageInfo as PackageJson;
}
