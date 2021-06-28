import { compileSite } from '../compiler/site';
export async function dev() {
    await compileSite();
}
export async function build() {
    await compileSite(true);
}