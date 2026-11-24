/* global process */
/**
 * RERA Registration Helper
 *
 * Reads state-specific and fallback RERA registration numbers from the environment.
 * NEVER hardcodes any registration number in code.
 * Returns an empty array if no environment variables are set.
 */

export function getReraRegistrations(env = process.env) {
    const haryana = (env.NEXT_PUBLIC_RERA_NUMBER_HARYANA || '').trim();
    const punjab = (env.NEXT_PUBLIC_RERA_NUMBER_PUNJAB || '').trim();
    const generic = (env.NEXT_PUBLIC_RERA_NUMBER || '').trim();

    const registrations = [];
    if (haryana) {
        registrations.push({ state: 'Haryana', label: 'HRERA Reg:', value: haryana });
    }
    if (punjab) {
        registrations.push({ state: 'Punjab', label: 'Punjab RERA Reg:', value: punjab });
    }
    if (registrations.length === 0 && generic) {
        registrations.push({ state: 'General', label: 'RERA Reg:', value: generic });
    }

    return registrations;
}

export function getLicenses(env = process.env) {
    const regs = getReraRegistrations(env);
    if (regs.length === 0) return undefined;
    if (regs.length === 1) return regs[0].value;
    return regs.map((r) => r.value);
}
