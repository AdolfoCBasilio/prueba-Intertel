export const getBfpM = (waist, neck, height) => {
    const bfp = ((495 / (1.0324 - 0.19077 * (Math.log10(waist - neck)) + 0.15456 * (Math.log10(height)))) - 450);
    return (bfp < 0 || isNaN(bfp)) ? 0 : bfp.toFixed(1);
}

export const getBfpF = (waist, neck, height, hip) => {
    const bfp = ((495 / (1.29579 - 0.35004 * (Math.log10(waist + hip - neck)) + 0.22100 * (Math.log10(height)))) - 450);
    return (bfp < 0 || isNaN(bfp)) ? 0 : bfp.toFixed(1);
}