import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { getBfpF, getBfpM } from "../../helpers/getBfp";
import './calculadora.css'

export const Calculadora = () => {

    const [formState, setFormState] = useState(false);
    const [bfp, setBfp] = useState("");
    const [porcentajeH, setPorcentajeH] = useState(0);
    const [porcentajeM, setPorcentajeM] = useState(0);
    const [estateGenere, setStateGenere] = useState('')

    const porcentajeGrasaHombre = (dato) => {
        const res = (dato * 100) / 25;

        if (res > 100) {
            return 100;
        } else {
            return res
        }
    }
    const porcentajeGrasaMujer = (dato) => {
        const res = ((dato * 100) / 32);
        if (res > 100) {
            return 100;
        }
        else if (res < 100) {
            return res.toFixed(1)
        }
    }

    return (
        <div className="contenedorPadre">

            <section className="sectionContenedor" >
            <header className="header" >
                <div className="headerDiv">
                    <img className="headerImg" src={require("../../assets/images/HealthImg.png")} alt="health" />
                    <h3 className="tituloApp"> Health Overview </h3>
                </div>
                <img className="headerImgMenu" src={require("../../assets/images/btnHeader.png")} alt="more" />
            </header>
                <div className="contenedor">
                    <div className="contenedordos">

                        <h1 className="tituloFormulario">Calculadora de Grasa Corporal</h1>
                        <p className="texto">El método de la Marina de Estados Unidos (US Navy Method) ofrece una manera sencilla de calcular un aproximado del porcentaje del tejido adiposo en el cuerpo de una persona.</p>
                        <p className="texto">Los valores requeridos por la fórmula son las siguientes:</p>

                    <div className="formularioContenedor">
                        <Formik
                            initialValues={{
                                genere: '',
                                height: '',
                                weight: '',
                                waist: '',
                                hip: '',
                                neck: '',
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.genere) {
                                    errors.genere = 'Selecciona un género';
                                }
                                if (!values.height) {
                                    errors.height = 'Ingrese altura';
                                } else if (values.height < 0) {
                                    errors.height = 'Ingrese una altura mayor a 0';
                                }
                                if (!values.weight) {
                                    errors.weight = 'Ingrese peso';
                                } else if (values.weight < 0) {
                                    errors.weight = 'Ingrese un peso mayor a 0';
                                }
                                if (!values.waist) {
                                    errors.waist = 'Ingrese cintura';
                                } else if (values.waist < 0) {
                                    errors.waist = 'ingrese medida de cintura mayor a 0';
                                }
                                if (values.genere === "female") {
                                    if (!values.hip) {
                                        errors.hip = 'Ingrese cadera';
                                    } else if (values.hip < 0) {
                                        errors.hip = 'Ingrese medida de cadera mayor a 0';
                                    }
                                }
                                if (!values.neck) {
                                    errors.neck = 'Ingrese cuello';
                                } else if (values.neck < 0) {
                                    errors.neck = 'Ingrese medida de cuello mayor a 0';
                                }
                                return errors;
                            }}
                            onSubmit={(values) => {
                                setFormState(true);
                                if (values.genere === "male") {
                                    setStateGenere('male')
                                    const bfp = getBfpM(values.waist, values.neck, values.height);
                                    setBfp(bfp);
                                    const porcentajetotal = porcentajeGrasaHombre(bfp)
                                    setPorcentajeH(porcentajetotal);
                                } else {
                                    setStateGenere('female')
                                    const bfp = getBfpF(values.waist, values.neck, values.height, values.hip);
                                    setBfp(bfp);
                                    const porcentajetotal = porcentajeGrasaMujer(bfp);
                                    setPorcentajeM(porcentajetotal)
                                }

                            }}
                        >
                            {({ errors, values, isValid }) => (
                                <Form className="formulario">
                                        <label className="formularioLabel" htmlFor="genere" >Género</label>
                                    <div className="radiobtn">
                                        <Field  type="radio" id="genere" name="genere" value="male"/> Hombre
                                        <Field className="radioGenero" type="radio" id="genere" name="genere" value="female" /> Mujer
                                        <ErrorMessage name="genere" component={() => (<div> {errors.genere} </div>)} />
                                    </div>

                                    <div className="displayError">
                                        <label className="formularioLabel" htmlFor="height" >Altura (cm)</label>
                                        <ErrorMessage  name="height" component={() => (<div className="errorMessage"> {errors.height} </div>)} />
                                    </div>
                                    <div className="formularioFieldContenedor">
                                        <Field
                                            className='fomularioField'
                                            type="number"
                                            placeholder='Escribe tu altura'
                                            id="height"
                                            name="height"
                                        />
                                    </div>

                                    <div className="displayError">
                                        <label className="formularioLabel" htmlFor="weight" >Peso (kg)</label>
                                        <ErrorMessage name="weight" component={() => (<div className="errorMessage"> {errors.weight} </div>)} />
                                    </div>
                                    <div className="formularioFieldContenedor">
                                        <Field
                                        className='fomularioField'
                                            type="number"
                                            placeholder='Escribe tu peso'
                                            id="weight"
                                            name="weight"
                                        />
                                    </div>

                                    <div className="displayError">
                                        <label className="formularioLabel" htmlFor="waist" >Cintura (cm)</label>
                                        <ErrorMessage name="waist" component={() => (<div className="errorMessage"> {errors.waist} </div>)} />
                                    </div>
                                    <div className="formularioFieldContenedor">
                                        <Field
                                        className='fomularioField'
                                            type="number"
                                            placeholder='Medida de tu cintura'
                                            id="waist"
                                            name="waist"
                                        />
                                    </div>

                                    {
                                        values.genere === "female" ? (
                                            <>
                                            <div className="displayError">
                                                <label className="formularioLabel" htmlFor="hip" >Cadera (cm)</label>
                                                <ErrorMessage name="hip" component={() => (<div className="errorMessage"> {errors.hip} </div>)} />
                                            </div>
                                            <div className="formularioFieldContenedor">
                                                <Field
                                                className='fomularioField'
                                                    type="number"
                                                    placeholder='Medida de tu cadera'
                                                    id="hip"
                                                    name="hip"
                                                />
                                            </div>
                                            </>
                                        ) : null
                                    }

                                    <div className="displayError">
                                        <label className="formularioLabel" htmlFor="neck" >Cuello (cm)</label>
                                        <ErrorMessage name="neck" component={() => (<div className="errorMessage"> {errors.neck} </div>)} />
                                    </div>
                                    <div className="formularioFieldContenedor">
                                        <Field
                                        className='fomularioField'
                                            type="number"
                                            placeholder='Medida de tu cuello'
                                            id="neck"
                                            name="neck"
                                        />
                                    </div>

                                    <div className="app__button-container">
                                        <button className="botonCalcular" disabled={isValid === false || values.genere === "" ? true : false} type="submit">Calcular</button>
                                        <button className="botonLimpiar" type="reset">Limpiar</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    </div>

                    {/*//! tabla hombres */}
                    {
                        (estateGenere === "male" && formState) && (

                            <div className="graficaContenedor">
                                <h2 className="tituloResultado">Tu resultado: {bfp}%</h2>

                                <div className="graficaIndicadorContenedor">
                                    <div className="graficaIndicadorWidth" style={{ width: `${porcentajeH}%` }}>
                                        <div>
                                            <h2 className="indicadorResultado">{bfp}%</h2>
                                            <img className="indicadorFlecha" src={require("../../assets/images/caret-abajo.png")} alt="more" />
                                        </div>
                                    </div>
                                </div>

                                <div className="gradientContenedor"></div>

                                <div className="rangosContenedor">

                                    <div className="hombresRangosUno">
                                        <div className="rangoEscencial">
                                        </div>
                                        <h3 className="rangosFontSize">2-4%</h3>
                                        <p className="rangosFontSize">Escencial</p>
                                    </div>

                                    <div className="hombresRangosDos">
                                        <div className="rangoDeportista">
                                        </div>
                                        <h3 className="rangosFontSize">6-13%</h3>
                                        <p className="rangosFontSize">Deportista</p>
                                    </div>

                                    <div className="hombresRangosUno">
                                        <div className="rangoFitness">
                                        </div>
                                        <h3 className="rangosFontSize">14-17%</h3>
                                        <p className="rangosFontSize">Fitness</p>
                                    </div>

                                    <div className="hombresRangosDos">
                                        <div className="rangoAceptable">
                                        </div>
                                        <h3 className="rangosFontSize">18-25%</h3>
                                        <p className="rangosFontSize">Aceptable</p>
                                    </div>

                                    <div className="hombresRangosTres">
                                        <div className="rangoObeso">
                                        </div>
                                        <h3 className="rangosFontSize">25%+</h3>
                                        <p className="rangosFontSize" >Obeso</p>
                                    </div>

                                </div>
                            </div>


                        )
                    }

                    {/* //! tabla para mujeres */}

                    {
                        (estateGenere === "female" && formState) &&
                        (
                            <div className="graficaContenedor">
                                <h2 className="tituloResultado">Tu resultado: {bfp}%</h2>

                                <div className="graficaIndicadorContenedor">
                                    <div className="graficaIndicadorWidth" style={{ width: `${porcentajeM}%` }}>
                                        <div>
                                            <h2 className="indicadorResultado">{porcentajeM}%</h2>
                                            <img className="indicadorFlecha" src={require("../../assets/images/caret-abajo.png")} alt="more" />
                                        </div>
                                    </div>
                                </div>

                                <div className="gradientContenedor"></div>

                                <div className="rangosContenedor">

                                    <div className="mujeresRangosUno">
                                        <div className="rangoEscencial">
                                        </div>
                                        <h3 className="rangosFontSize">10-13%</h3>
                                        <p className="rangosFontSize">Escencial</p>
                                    </div>

                                    <div className="mujeresRangosDos">
                                        <div className="rangoDeportista">
                                        </div>
                                        <h3 className="rangosFontSize">14-20%</h3>
                                        <p className="rangosFontSize">Deportista</p>
                                    </div>

                                    <div className="mujeresRangosUno">
                                        <div className="rangoFitness">
                                        </div>
                                        <h3 className="rangosFontSize">21-24%</h3>
                                        <p className="rangosFontSize">Fitness</p>
                                    </div>

                                    <div className="mujeresRangosDos">
                                        <div className="rangoAceptable">
                                        </div>
                                        <h3 className="rangosFontSize">25-31%</h3>
                                        <p className="rangosFontSize">Aceptable</p>
                                    </div>

                                    <div className="mujeresRangosTres">
                                        <div className="rangoObeso">
                                        </div>
                                        <h3 className="rangosFontSize">32%+</h3>
                                        <p className="rangosFontSize" >Obeso</p>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                </div>
            </section>

        </div>
    )
}
