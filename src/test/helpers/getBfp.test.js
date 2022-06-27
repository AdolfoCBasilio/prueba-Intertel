import { getBfpF,getBfpM} from '../../helpers/getBfp'

describe('Funciones de getBfp',()=>{
    describe('Funcion getBfpM', () => {
        test('Debe retornar 15.7 con los valores 96,50,178', () => {
            const result = getBfpM(96,50,178);
            expect(result).toBe('15.7')
        });
        test('Debe retornar 0 con valores < 0', () => {
            const result = getBfpM(-10,-20,-10);
            expect(result).toBe(0)
        });
        test('verifica que no tenga mas de un decimal', () => {
            const result = getBfpM(96,50,178);
            expect(result.length).toEqual(4)
        });
    });
    describe('Funcion getBfpF',()=>{
        test('Debe retornar 15.7 con los valores 80,50,70,92', () => {
            const result = getBfpF(80,50,178,92)
            expect(result).toBe('15.7')
        });
        test('Debe retornar 0 con valores < 0', () => {
            const result = getBfpF(-10,-20,-10,-10);
            expect(result).toBe(0)
        });
        test('verifica que no tenga mas de un decimal', () => {
            const result = getBfpF(96,50,178,92);
            expect(result.length).toEqual(4)
        });
    })
})