const libraryData = {
    punto: {
        nombreCompleto: 'El punto',
        simbolo: '.',
        definicion: 'El punto es un signo de puntuación cuya función principal es señalar gráficamente la pausa que marca el final de un enunciado, de un párrafo o de un texto.',
        tipos: [
            {
                nombre: 'Punto y seguido',
                desc: 'Separa enunciados que integran un mismo párrafo. Después de este punto, se continúa escribiendo en la misma línea. Es fundamental para mantener la cohesión temática dentro de una idea compleja.',
                ejemplos: [
                    'Hoy salí del trabajo más temprano. Fui al parque a disfrutar del atardecer.',
                    'Mi hermana preparó una deliciosa comida. Todos disfrutamos mucho de la cena en familia.'
                ]
            },
            {
                nombre: 'Punto y aparte',
                desc: 'Separa dos párrafos distintos que suelen desarrollar contenidos diferentes dentro de una misma unidad de texto. Tras él, se debe escribir en una línea distinta y, por regla general, comenzar con sangría.',
                ejemplos: [
                    'El fin de semana pasado fuimos de viaje a la playa. Las olas eran perfectas para nadar y disfrutamos de un día increíble.' + '<hr style="border-color: transparent; opacity: 0; margin: 10px 0;">' + 'Por la tarde, visitamos un restaurante local donde probamos platos típicos de la región.'
                ]
            },
            {
                nombre: 'Punto final',
                desc: 'Es el que cierra un texto, un capítulo o una sección determinada. No debe confundirse con el término "punto y final" (expresión incorrecta según la RAE; lo correcto es simplemente punto final).',
                ejemplos: [
                    'Después de años de estudio, finalmente obtuve mi título profesional. Este logro representa el cumplimiento de un sueño que había perseguido desde la infancia.' + '<hr style="border-color: transparent; opacity: 0; margin: 10px 0;">' + '<hr style="border-color: transparent; opacity: 0; margin: 10px 0;">'
                ]
            }
        ],
        reglasDeOro: [
            {
                titulo: 'Espaciado',
                desc: 'Se escribe siempre pegado a la palabra o signo que lo precede, y separado por un espacio de la palabra o signo que lo sigue.',
                ejemplos: ['Incorrecto: palabra . palabra\nCorrecto: palabra. palabra']
            },
            {
                titulo: 'Uso de mayúsculas',
                desc: 'La palabra que sigue al punto se escribe siempre con mayúscula inicial (salvo en el caso de las abreviaturas).',
                ejemplos: ['Incorrecto: El proyecto terminó. continuaremos mañana\nCorrecto: El proyecto terminó. Continuaremos mañana']
            },
            {
                titulo: 'Abreviaturas',
                desc: 'El punto se utiliza después de las abreviaturas. Si la abreviatura incluye una letra volada, el punto se coloca antes de esta.',
                ejemplos: ['La Dra. García llegó a la cita', '3.ᵉʳ piso del hospital']
            }
        ],
        casosEspeciales: [
            {
                titulo: 'Con otros signos de cierre',
                desc: 'El punto se coloca siempre después de las comillas, los paréntesis, los corchetes y las rayas de cierre.',
                ejemplos: ['Mi jefe dijo: "Entrega el informe mañana".\nLa película (que es muy buena) ganó varios premios.\nConclusión: "Todos ganamos con esto".']
            },
            {
                titulo: 'Dos puntos: mayúsculas y minúsculas',
                desc: 'Después de dos puntos se escribe con minúscula si el texto continúa en la misma línea, pero con mayúscula si comienza en la siguiente línea.',
                ejemplos: ['Necesito: papel, lápiz y goma (minúscula en la misma línea)\nIngredientes:\n      Harina, huevos, azúcar (mayúscula en línea nueva)']
            },
            {
                titulo: 'Signos de interrogación y exclamación',
                desc: 'Nunca debe escribirse un punto tras los signos de cierre de interrogación (?) o exclamación (!). Estos signos ya cumplen la función de punto final del enunciado.',
                ejemplos: ['Incorrecto: ¿Cuándo llegas?.\nCorrecto: ¿Cuándo llegas?\nIncorrecto: ¡Qué maravilla!.\nCorrecto: ¡Qué maravilla!']
            },
        ],
        zonasPeligro: [
            {
                titulo: 'Títulos y subtítulos',
                desc: 'Nunca se pone punto final en títulos o subtítulos de libros, artículos, capítulos o tablas cuando aparecen aislados.',
                ejemplos: ['Incorrecto: Mi viaje a Europa.\nCorrecto: Mi viaje a Europa']
            },
            {
                titulo: 'Cifras numéricas',
                desc: 'En la escritura de números, no se utiliza el punto para separar los millares (la norma actual prefiere el espacio fino o ningún espacio: 2026 o 2 026). Sin embargo, sí se usa el punto (o la coma) para separar la parte entera de la decimal según la región.',
                ejemplos: ['Población: 2 500 000 habitantes (no 2.500.000)\nPrecio: 49.95 euros (separador decimal)']
            }
        ],
        datosCuriosos: [
            {
                titulo: 'Siglas',
                desc: 'Las siglas no llevan puntos entre sus letras, a menos que formen parte de un texto escrito todo en mayúsculas.',
                ejemplos: ['ONU, DNI, UNESCO, SARS-CoV-2', 'Incorrecto: O.N.U.']
            }
        ]
    },
    coma: {
        nombreCompleto: 'La coma',
        simbolo: ',',
        definicion: 'La coma es un signo de puntuación que indica una pausa breve dentro de un enunciado. Se escribe pegada a la palabra o signo que lo precede y separada por un espacio de la palabra o signo que la sigue. Su uso es vital, ya que puede cambiar totalmente el sentido de una oración.',
        bloques: [
            {
                titulo: '🎯 Tipos de coma',
                tipo: 'cards',
                contenido: [
                    {
                        nombre: 'Coma enumerativa',
                        desc: 'Separa elementos de una enumeración (salvo tras y, e, o, u, ni).',
                        ejemplos: ['Compré manzanas, peras, plátanos y uvas.']
                    },
                    {
                        nombre: 'Coma vocativa',
                        desc: 'Aísla al vocativo (a quien se habla) del resto de la oración.',
                        ejemplos: ['Juan, ven aquí.', 'Hola, mamá.']
                    },
                    {
                        nombre: 'Coma explicativa',
                        desc: 'Encierra aclaraciones que, si se quitan, la oración sigue funcionando.',
                        ejemplos: ['La casa, que era muy antigua, se derrumbó.']
                    },
                    {
                        nombre: 'Coma elíptica',
                        desc: 'Sustituye a un verbo mencionado antes o sobreentendido.',
                        ejemplos: ['Víctor es arquitecto; Amanda, ingeniera.']
                    },
                    {
                        nombre: 'Coma con conectores',
                        desc: 'Va antes y después de: es decir, sin embargo, por tanto, etc.',
                        ejemplos: ['Estudió mucho; sin embargo, no aprobó.']
                    }
                ]
            },
            {
                titulo: '📝 Usos según el orden (hipérbaton)',
                tipo: 'reglas',
                contenido: [
                    {
                        titulo: 'Complemento al inicio',
                        desc: 'Si cambias el orden y pones el complemento al principio, usa coma.',
                        ejemplos: ['A pesar de la lluvia, salimos.<br><span style="color: black; font-weight: bold;">Orden original: </span><span style="color: #4361ee; font-weight: bold;">Salimos a pesar de la lluvia.</span>']
                    }
                ]
            },
            {
                titulo: '⚙️ Conectores en coordinadas',
                tipo: 'warning',
                contenido: [
                    {
                        nombre: 'Adversativas',
                        desc: 'Se escribe siempre coma ante las conjunciones pero, mas, sino, aunque.',
                        ejemplos: ['Hazlo como quieras, pero hazlo.']
                    },
                    {
                        nombre: 'Consecutivas',
                        desc: 'Se escribe coma ante las conjunciones conque, así que, de manera que.',
                        ejemplos: ['Prometiste venir, así que te esperamos.']
                    }
                ]
            },
            {
                titulo: '💡 Usos no lingüísticos',
                tipo: 'info',
                contenido: [
                    {
                        titulo: 'En números',
                        desc: 'En la escritura de números, la RAE acepta tanto el punto como la coma para separar la parte entera de la decimal, aunque prefiere la coma en el uso general. Ejemplo: 3,1416 o 3.1416.',
                        ejemplos: []
                    }
                ]
            },
            {
                titulo: '❌ La "coma criminal" (error que se debe evitar)',
                tipo: 'danger',
                contenido: [
                    {
                        titulo: 'Separar sujeto y verbo',
                        desc: 'Se denomina "coma criminal" a aquella que separa el sujeto del predicado (verbo), lo cual es un error grave en la gramática española, sin importar qué tan larga sea la frase.',
                        ejemplos: [
                            'Incorrecto: Los estudiantes que aprobaron el examen el lunes pasado, recibieron un premio.\nCorrecto: Los estudiantes que aprobaron el examen el lunes pasado recibieron un premio.'
                        ]
                    }
                ]
            }
        ]
    },
    puntocoma: {
        nombreCompleto: 'El punto y coma',
        simbolo: ';',
        definicion: 'Es un signo de puntuación que indica una pausa mayor que la de la coma y menor que la del punto. Su función es delimitar unidades lingüísticas inferiores al enunciado, como oraciones o grupos sintácticos complejos.',
        bloques: [
            {
                titulo: '🎯 Principales usos lingüísticos',
                tipo: 'cards',
                contenido: [
                    {
                        nombre: 'Enumeraciones complejas',
                        desc: 'Se usa para separar los elementos de una enumeración cuando estos ya incluyen comas internas, evitando así la confusión del lector.',
                        ejemplos: ['Cada grupo irá por un lado: el primero, por la izquierda; el segundo, por la derecha, y el tercero, de frente.']
                    },
                    {
                        nombre: 'Oraciones yuxtapuestas',
                        desc: 'Para separar oraciones sintácticamente independientes pero que guardan una estrecha relación de sentido (semántica).',
                        ejemplos: ['Todo el mundo a casa; ya no hay nada más que hacer.']
                    },
                    {
                        nombre: 'Antes de conectores',
                        desc: 'Se escribe punto y coma antes de conectores como pero, mas, aunque, sin embargo, especialmente cuando la frase tiene una extensión considerable.',
                        ejemplos: ['Los jugadores entrenaron intensamente durante todo el mes; sin embargo, los resultados no fueron los esperados.']
                    }
                ]
            },
            {
                titulo: '📝 Reglas de escritura (ortotipografía)',
                tipo: 'reglas',
                contenido: [
                    {
                        nombre: 'Espaciado',
                        desc: 'Se escribe pegado a la palabra que lo precede y separado por un espacio de la palabra que lo sigue.',
                        ejemplos: ['Incorrecto: Llegó tarde ; no se lo esperaba. <br> Correcto: Llegó tarde; no se lo esperaba.']
                    },
                    {
                        nombre: 'Uso de minúsculas',
                        desc: 'La palabra que sigue al punto y coma debe escribirse siempre con minúscula (a menos que sea un nombre propio).',
                        ejemplos: ['Incorrecto: No te preocupes; Todo saldrá bien. <br> Correcto: No te preocupes; todo saldrá bien.']
                    },
                    {
                        nombre: 'Plural',
                        desc: 'El nombre del signo es invariable en plural: los punto y coma.',
                        ejemplos: ['Incorrecto: Coloca los puntos y comas en las frases. <br> Correcto: Coloca los punto y coma en las frases.']
                    },
                    {
                        nombre: 'En listas verticales',
                        desc: 'Se coloca al final de cada elemento de una lista cuando estos se escriben en líneas independientes y comienzan con minúscula. El último elemento se cierra con un punto.',
                        ejemplos: ['a) Una oración simple; <br> b) Una oración compuesta; <br> c) Una oración subordinada.']
                    }
                ]
            },
            {
                titulo: '❌ La "zona de peligro" (errores comunes)',
                tipo: 'danger',
                contenido: [
                    {
                        titulo: 'Sustitución incorrecta',
                        desc: 'No debe usarse punto y coma para separar oraciones subordinadas de la principal.',
                        ejemplos: ['Incorrecto: La norma es clara; siendo irrelevante lo dicho antes.\nCorrecto: La norma es clara, siendo irrelevante lo dicho antes.']
                    },
                    {
                        titulo: 'Fórmulas de saludo',
                        desc: 'En las cartas o correos, nunca se usa punto y coma tras el saludo inicial; lo correcto en español son los dos puntos (:).',
                        ejemplos: ['Incorrecto: Querido amigo;\nCorrecto: Querido amigo:']
                    }
                ]
            }
        ]
    },
    dospuntos: {
        nombreCompleto: 'Los dos puntos',
        simbolo: ':',
        definicion: 'Los dos puntos representan una pausa mayor que la de la coma y menor que la del punto. A diferencia del punto, los dos puntos no indican el final de un enunciado, sino que anuncian que lo que sigue es una explicación, una consecuencia o una enumeración de lo que se acaba de decir.',
        bloques: [
            {
                titulo: '🎯 Principales usos lingüísticos',
                tipo: 'cards',
                contenido: [
                    {
                        nombre: 'Enumeraciones anunciadas',
                        desc: 'Se utilizan para introducir una lista, siempre que esta haya sido anunciada previamente por una palabra o elemento general.',
                        ejemplos: ['Mañana compraré dos cosas: pan y leche.']
                    },
                    {
                        nombre: 'Citas textuales (Discurso directo)',
                        desc: 'Se escriben tras los verbos de "decir" (dijo, exclamó, afirmó) para introducir las palabras exactas de otra persona, las cuales deben ir entre comillas y comenzar con mayúscula.',
                        ejemplos: ["Sócrates dijo: 'Solo sé que nada sé'."]
                    },
                    {
                        nombre: 'Relaciones de causa y efecto',
                        desc: 'Se emplean para conectar dos oraciones sin usar nexos (como porque o por lo tanto), donde la segunda oración explica, resume o es consecuencia de la primera.',
                        ejemplos: ['Se quedó sin gasolina: no podrá llegar a tiempo.']
                    },
                    {
                        nombre: 'Fórmulas de saludo',
                        desc: 'Es obligatorio su uso tras el saludo inicial en cartas, mensajes y correos electrónicos.',
                        ejemplos: ['Estimada profesora Nohimy:']
                    }
                ]
            },
            {
                titulo: '📝 Reglas de escritura (ortotipografía)',
                tipo: 'reglas',
                contenido: [
                    {
                        nombre: 'Espaciado',
                        desc: 'Se escriben pegados a la palabra anterior y separados por un espacio de la palabra posterior.'
                    }
                ]
            },
            {
                titulo: '⚠️ Regla de ortografía: ¿Mayúscula o minúscula?',
                tipo: 'info',
                contenido: [
                    {
                        nombre: '¿Cuándo usar mayúscula o minúscula?',
                        desc: '<ul><li><strong>Minúscula:</strong> cuando lo que sigue es una enumeración o una explicación en la misma línea.</li><li><strong>Mayúscula:</strong> tras los dos puntos de un saludo en una carta, tras citas textuales o cuando introducen enunciados independientes en párrafos distintos.</li></ul>'
                    }
                ]
            },
            {
                titulo: '❌ La "zona de peligro" (errores comunes)',
                tipo: 'danger',
                contenido: [
                    {
                        titulo: 'La enumeración no anunciada',
                        desc: 'No se deben poner dos puntos si no hay un elemento que anticipe la lista.',
                        ejemplos: ['Incorrecto: "Mis amigos son: Juan, Luis y Pedro".\nCorrecto: "Mis amigos son Juan, Luis y Pedro".']
                    },
                    {
                        titulo: 'Uso tras preposiciones',
                        desc: 'Nunca deben escribirse dos puntos después de preposiciones como de, en, para.'
                    }
                ]
            }
        ]
    },
    puntos_suspensivos: {
        nombreCompleto: 'Los puntos suspensivos',
        simbolo: '...',
        definicion: 'Son un signo de puntuación formado por tres puntos consecutivos (...), y solo tres, llamados así porque su uso principal es dejar en suspenso el discurso.',
        bloques: [
            {
                titulo: '🎯 Principales usos lingüísticos',
                tipo: 'cards',
                contenido: [
                    {
                        nombre: 'Interrupción voluntaria',
                        desc: 'Se usan para indicar que se omite algo o que el enunciado se deja incompleto porque el final se da por sobreentendido.',
                        ejemplos: ['A quien madruga..., así que dense prisa.']
                    },
                    {
                        nombre: 'Enumeraciones abiertas',
                        desc: 'Tienen la misma función que la palabra etcétera. Indican que la lista podría continuar.',
                        ejemplos: ['Puedes traer lo que quieras: refrescos, papas, dulces...']
                    },
                    {
                        nombre: 'Duda, temor o vacilación',
                        desc: 'Expresan una pausa transitoria que refleja inseguridad o suspense.',
                        ejemplos: ['Te llaman del hospital... Espero que sean buenas noticias.']
                    },
                    {
                        nombre: 'Omisión en citas',
                        desc: 'Entre corchetes [...] o paréntesis (...), indican que se ha suprimido un fragmento de un texto original.'
                    }
                ]
            },
            {
                titulo: '📝 Reglas de oro (ortotipografía)',
                tipo: 'reglas',
                contenido: [
                    {
                        nombre: 'Espaciado',
                        desc: 'Se escriben siempre pegados a la palabra que los precede y separados por un espacio de la que los sigue. Si les sigue otro signo de puntuación (coma, punto y coma, etc.), no se deja espacio entre ellos.',
                        ejemplos: ['Incorrecto: Creo que ... no iré.\nCorrecto: Creo que... no iré.']
                    },
                    {
                        nombre: 'Uso de Mayúsculas',
                        desc: 'Si cierran el enunciado, la palabra siguiente comienza con mayúscula. Si el enunciado continúa, se inicia con minúscula.',
                        ejemplos: ['<strong>Cierre de enunciado:</strong> "Si tú lo dices... Bueno, te creo." <br> <strong>Continuación:</strong> "Me gustaría... pero no puedo."']
                    },
                    {
                        nombre: 'Incompatibilidad con el punto',
                        desc: 'Nunca debe escribirse un punto de cierre inmediatamente después de los puntos suspensivos.',
                        ejemplos: ['Incorrecto: Me gusta todo: cine, teatro, música....\nCorrecto: Me gusta todo: cine, teatro, música...']
                    }
                ]
            },
            {
                titulo: '⚙️ Casos especiales y combinaciones',
                tipo: 'warning',
                contenido: [
                    {
                        titulo: 'Abreviaturas',
                        desc: 'Cuando los puntos suspensivos siguen a una abreviatura que ya termina en punto, se escriben un total de cuatro puntos.',
                        ejemplos: ['<strong>Ejemplo:</strong> Estudió historia, geografía, literatura, etc....']
                    },
                    {
                        titulo: 'Signos de interrogación y exclamación',
                        desc: 'Si el enunciado está incompleto, van dentro de los signos de cierre. Si está completo, van fuera.',
                        ejemplos: ['<strong>Ejemplo:</strong> ¿Vendrás...?', '¡Qué alegría...!', '¿Cómo...?', '¡...!', '¿...?']
                    },
                    {
                        titulo: 'Redundancia',
                        desc: 'Es incorrecto usar los puntos suspensivos junto a la palabra etcétera o su abreviatura.',
                        ejemplos: ['Incorrecto: Me gusta todo: cine, teatro, música, etc....' + '<br>' + 'Correcto: Me gusta todo: cine, teatro, música...']
                    }
                ]
            }
        ]
    },
    comillas: {
        nombreCompleto: 'Las comillas',
        simbolo: '""',
        definicion: 'Se escriben pegadas a la primera y a la última palabra del período que enmarcan, y separadas por un espacio de las palabras o signos que las preceden o las siguen.',
        bloques: [
            {
                titulo: '🎯 Principales usos lingüísticos',
                tipo: 'cards',
                contenido: [
                    {
                        nombre: 'Citas textuales',
                        desc: 'Para reproducir palabras exactas dichas por alguien o extraídas de una obra.',
                        ejemplos: ['El profesor dijo: "Mañana tendremos el examen de ortografía".']
                    },
                    {
                        nombre: 'Pensamientos en textos narrativos',
                        desc: 'Para indicar lo que un personaje piensa pero no dice en voz alta.',
                        ejemplos: ['"¡Qué suerte tengo!", pensó Clara mientras caminaba.']
                    },
                    {
                        nombre: 'Uso irónico o especial',
                        desc: 'Para indicar que una palabra es impropia, vulgar, procede de otra lengua o se utiliza con un sentido irónico o especial.',
                        ejemplos: ['Últimamente está muy "ocupado" con sus videojuegos.']
                    },
                    {
                        nombre: 'Títulos de partes internas',
                        desc: 'Para citar títulos de artículos, poemas, capítulos de libros o reportajes cuando se mencionan dentro de un texto.',
                        ejemplos: ['Has leído el capítulo titulado "La acentuación" en este software.']
                    }
                ]
            },
            {
                titulo: '📚 Jerarquía y combinación de signos',
                tipo: 'list-blue',
                contenido: [
                    {
                        nombre: 'Orden recomendado',
                        desc: 'En español, existe una jerarquía cuando se deben usar comillas dentro de otras comillas:'
                    },
                    {
                        nombre: '1. Comillas angulares (« »)',
                        desc: 'Para el bloque exterior.'
                    },
                    {
                        nombre: '2. Comillas dobles (" ")',
                        desc: 'Para el bloque intermedio.'
                    },
                    {
                        nombre: '3. Comillas simples (\' \')',
                        desc: 'Para el bloque más interno.'
                    }
                ]
            },
            {
                titulo: '📝 Regla de Oro de Puntuación',
                tipo: 'reglas',
                contenido: [
                    {
                        nombre: 'El punto y las comillas',
                        desc: 'El punto se coloca siempre después de las comillas de cierre. Esta es una de las diferencias más importantes con el sistema inglés.',
                        ejemplos: ['Correcto: "No llegaré tarde". (Punto fuera).\nIncorrecto: "No llegaré tarde." (Punto dentro).']
                    }
                ]
            },
            {
                titulo: '❌ La "zona de peligro" (errores comunes)',
                tipo: 'danger',
                contenido: [
                    {
                        titulo: '🚫 Uso innecesario en apodos',
                        desc: 'No es necesario usar comillas en los apodos cuando se sitúan entre el nombre y el apellido (se prefiere la cursiva o nada), y nunca si el apodo va solo.'
                    },
                    {
                        titulo: '🚫 Signos de puntuación internos',
                        desc: 'Si el texto entrecomillado termina con signos de interrogación o exclamación, estos se mantienen dentro, pero el punto final de la oración sigue yendo fuera de las comillas.'
                    }
                ]
            }
        ]
    },
    parentesis: {
        nombreCompleto: 'Los paréntesis',
        simbolo: '( )',
        definicion: 'Los paréntesis son signos de puntuación dobles que se utilizan para insertar información aclaratoria o secundaria que interrumpe el enunciado principal.',
        bloques: [
            {
                titulo: '🎯 Principales usos lingüísticos',
                tipo: 'cards',
                contenido: [
                    {
                        nombre: 'Incisos e interrupciones',
                        desc: 'Para introducir aclaraciones que se alejan del tema principal.',
                        ejemplos: ['El equipo de investigación (compuesto por especialistas de diversas universidades) publicó los resultados ayer.']
                    },
                    {
                        nombre: 'Datos aclaratorios',
                        desc: 'Para encerrar fechas, lugares, siglas o autores.',
                        ejemplos: ['La ONU (Organización de las Naciones Unidas) tiene su sede en Nueva York.']
                    },
                    {
                        nombre: 'Opciones o alternativas',
                        desc: 'Para introducir variaciones de género o número.',
                        ejemplos: ['Se busca enfermero(a) para turno noche.']
                    },
                    {
                        nombre: 'Listas o enumeraciones',
                        desc: 'Para organizar índices o clasificaciones.',
                        ejemplos: ['a) Punto, b) Coma.']
                    }
                ]
            },
            {
                titulo: '📚 Jerarquía y combinación de signos',
                tipo: 'list-blue',
                contenido: [
                    {
                        nombre: 'Orden de anidamiento',
                        desc: 'En contextos técnicos y de esquemas, la jerarquía recomendada es:'
                    },
                    {
                        nombre: '1. Las llaves { }',
                        desc: 'Para el bloque exterior. Se usan principalmente en cuadros sinópticos o esquemas.'
                    },
                    {
                        nombre: '2. Los corchetes [ ]',
                        desc: 'Para el bloque intermedio. En textos lingüísticos, si necesitas poner un paréntesis dentro de otro, la RAE recomienda usar corchetes en el interior: ( [ ] ).'
                    },
                    {
                        nombre: '3. Los paréntesis ( )',
                        desc: 'Para el bloque más interno. Es el signo de uso más frecuente.'
                    }
                ]
            },
            {
                titulo: '📝 Reglas de oro (ortotipografía)',
                tipo: 'reglas',
                contenido: [
                    {
                        nombre: 'Espaciado',
                        desc: 'Se escriben pegados a la palabra que encierran y separados por un espacio de las palabras externas.'
                    },
                    {
                        nombre: 'Puntuación externa',
                        desc: 'El punto, la coma y el punto y coma se colocan siempre después del signo de cierre.',
                        ejemplos: ['Correcto: Mañana es el examen (estudien mucho).', 'Incorrecto: Mañana es el examen. (estudien mucho)']
                    },
                    {
                        nombre: 'Puntuación interna',
                        desc: 'El texto dentro de los paréntesis mantiene su propia puntuación (interrogación o exclamación), pero el punto final de la oración siempre va fuera.'
                    }
                ]
            },
            {
                titulo: '❌ La "zona de peligro" (errores comunes)',
                tipo: 'danger',
                contenido: [
                    {
                        titulo: '🚫 Coma antes del paréntesis',
                        desc: 'Nunca pongas una coma antes de abrir un paréntesis. Si la pausa es necesaria, la coma debe ir después de cerrar el paréntesis.',
                        ejemplos: ['Incorrecto: Cuando llegues, (llámame).\nCorrecto: Cuando llegues (llámame).']
                    },
                    {
                        titulo: '🚫 Paréntesis innecesarios',
                        desc: 'Si la aclaración es muy breve, usa comas. Los paréntesis se reservan para información que realmente interrumpe el flujo.',
                        ejemplos: ['<strong>Preferible con comas:</strong> "Mi tío, que es médico, me ayudó." <br> <strong>Con paréntesis (menos fluido):</strong> "Mi tío (que es médico) me ayudó."']
                    }
                ]
            }
        ]
    },
    exclamacion: {
        nombreCompleto: 'Los signos de exclamación',
        simbolo: '¡ !',
        definicion: 'A diferencia de otros idiomas como el inglés, en español estos signos son obligatoriamente dobles: uno de apertura (¡) y otro de cierre (!).',
        bloques: [
            {
                titulo: '🎯 Principales usos lingüísticos',
                tipo: 'cards',
                contenido: [
                    {
                        nombre: 'Enunciados exclamativos',
                        desc: 'Se utilizan para encerrar enunciados que expresan emociones intensas o énfasis.',
                        ejemplos: ['¡Qué alegría verte por aquí!']
                    },
                    {
                        nombre: 'Interjecciones',
                        desc: 'Son palabras que por sí solas forman un enunciado exclamativo (apelaciones, sentimientos, onomatopeyas).',
                        ejemplos: ['¡Ay!, ¡Bah!, ¡Zas!, ¡Hola!']
                    },
                    {
                        nombre: 'Mandatos o órdenes',
                        desc: 'Se usan para dar fuerza a una instrucción o ruego.',
                        ejemplos: ['¡Escúchame cuando te hablo!']
                    },
                    {
                        nombre: 'Uso irónico o de sorpresa',
                        desc: 'Un signo de exclamación de cierre entre paréntesis (!) indica que un dato es sorprendente o irónico.',
                        ejemplos: ['Dice que ha trabajado mucho (!).']
                    }
                ]
            },
            {
                titulo: '📝 Reglas de oro (ortotipografía)',
                tipo: 'reglas',
                contenido: [
                    {
                        nombre: 'Apertura obligatoria',
                        desc: 'Nunca se debe omitir el signo de apertura (¡). Es un error grave en español iniciar una exclamación solo con el signo final.',
                        ejemplos: ['Incorrecto: Qué sorpresa!\nCorrecto: ¡Qué sorpresa!']
                    },
                    {
                        nombre: 'Espaciado',
                        desc: 'Los signos se escriben pegados a la primera y última palabra del enunciado que enmarcan, y separados por un espacio de las palabras que los rodean.',
                        ejemplos: ['Incorrecto: ¡ Hola !\nCorrecto: ¡Hola!']
                    },
                    {
                        nombre: 'Compatibilidad con el punto',
                        desc: 'Nunca se escribe un punto después del signo de exclamación de cierre. El punto que forma parte del signo ya cumple la función de punto final.',
                        ejemplos: ['Correcto: ¡Llegamos tarde! Tenemos que correr.\nIncorrecto: ¡Llegamos tarde!. Tenemos que correr.']
                    },
                    {
                        nombre: 'Mayúsculas y minúsculas',
                        desc: 'Si la exclamación termina la oración, la siguiente palabra empieza con mayúscula. Si tras el signo de cierre hay una coma o punto y coma, la siguiente palabra empieza con minúscula.',
                        ejemplos: ['<strong>Mayúscula:</strong> ¡No me digas! ¿Cuándo ocurrió? <br> <strong>Minúscula:</strong> ¡No me digas!, ¿cuándo ocurrió?']
                    }
                ]
            },
            {
                titulo: '⚙️ Combinación con otros signos',
                tipo: 'warning',
                contenido: [
                    {
                        titulo: 'Con interrogación',
                        desc: 'Si una frase es a la vez pregunta y exclamación, se pueden combinar los signos.',
                        ejemplos: ['¡¿Cómo te atreves?!', '¿¡Qué haces!?']
                    },
                    {
                        titulo: 'Signos múltiples',
                        desc: 'En textos literarios o muy expresivos, se permite repetir los signos (dos o tres) para dar más énfasis, siempre que sean los mismos al abrir y al cerrar.',
                        ejemplos: ['¡¡¡Gool!!!']
                    }
                ]
            }
        ]
    },
    interrogacion: {
        nombreCompleto: 'Los signos de interrogación',
        simbolo: '¿ ?',
        definicion: 'Estos signos indican que la oración que enmarcan se pronuncia con una entonación interrogativa. A diferencia de otros idiomas, en nuestra lengua es obligatorio el uso del signo de apertura (¿).',
        bloques: [
            {
                titulo: '🎯 Principales usos lingüísticos',
                tipo: 'cards',
                contenido: [
                    {
                        nombre: 'Interrogaciones directas',
                        desc: 'Se usan para encerrar preguntas completas.',
                        ejemplos: ['¿Cómo se llama el software educativo?']
                    },
                    {
                        nombre: 'Preguntas parciales',
                        desc: 'A veces, solo una parte de la oración es interrogativa; en ese caso, los signos solo enmarcan esa parte.',
                        ejemplos: ['Si no vienes hoy, ¿cuándo piensas entregar el expediente?']
                    },
                    {
                        nombre: 'Duda o ironía',
                        desc: 'Un signo de interrogación de cierre entre paréntesis (?) expresa duda, inseguridad o una intención irónica sobre un dato.',
                        ejemplos: ['Nació en 1910 (?) y murió en 1995.']
                    },
                    {
                        nombre: 'Fechas dudosas',
                        desc: 'En textos históricos, se usan para indicar que una fecha no es exacta.',
                        ejemplos: ['[¿1542? - 1590]']
                    }
                ]
            },
            {
                titulo: '📝 Reglas de oro (ortotipografía)',
                tipo: 'reglas',
                contenido: [
                    {
                        nombre: 'Signos pegados',
                        desc: 'Se escriben sin dejar espacio entre el signo y la palabra inicial o final de la pregunta.',
                        ejemplos: ['Incorrecto: ¿ Qué hora es ?\nCorrecto: ¿Qué hora es?']
                    },
                    {
                        nombre: 'El punto "invisible"',
                        desc: 'Jamás se debe escribir un punto después del signo de interrogación de cierre. El punto que ya trae el signo cumple esa función.',
                        ejemplos: ['Incorrecto: ¿Vienes?. Te espero.\nCorrecto: ¿Vienes? Te espero.']
                    },
                    {
                        nombre: 'Uso de mayúsculas',
                        desc: 'Si la pregunta termina la oración, la palabra siguiente comienza con mayúscula. Si hay una coma después, comienza con minúscula.',
                        ejemplos: ['<strong>Mayúscula:</strong> ¿Cómo estás? Espero que bien. <br> <strong>Minúscula:</strong> ¿Cómo estás?, espero que bien.']
                    },
                    {
                        nombre: 'Vocativos fuera',
                        desc: 'Si el nombre de la persona a la que te diriges (vocativo) va al principio, queda fuera de los signos; si va al final, queda dentro.',
                        ejemplos: ['Correcto: Nohimy, ¿ya terminó el informe? <br> Correcto: ¿Ya terminó el informe, Nohimy?']
                    }
                ]
            },
            {
                titulo: '❌ La "zona de peligro" (errores comunes)',
                tipo: 'danger',
                contenido: [
                    {
                        titulo: '🚫 Omitir el signo de apertura',
                        desc: 'Es el error más común debido a la influencia del inglés. En español, no poner el ¿ es una falta ortográfica grave.',
                        ejemplos: ['Incorrecto: Cómo te llamas?\nCorrecto: ¿Cómo te llamas?']
                    },
                    {
                        titulo: '🚫 Interrogativas indirectas',
                        desc: 'No se usan signos de interrogación en preguntas que dependen de un verbo (como preguntar, saber, decir).',
                        ejemplos: ['Correcto: Dime cuánto cuesta. <br> Incorrecto: Dime ¿cuánto cuesta?']
                    }
                ]
            }
        ]
    }
};
