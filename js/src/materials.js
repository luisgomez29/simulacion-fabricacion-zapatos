/*!
 * Simulación de procesos de fabricación de zapatos.
 * Copyright 2020. Luis Guillermo Gómez Galeano
 * Todos los derechos reservados.
 */

/**
 * Lista de materiales disponibles
 * @type {Object[]}
 */
const availableMaterials = [
    {name: "cuero", quantity: 120},
    {name: "tela", quantity: 215},
    {name: "suela", quantity: 304},
    {name: "nylon", quantity: 96},
]

/**
 * Tiempo de demora de cada función
 * @type {number}
 */
const time = 1000

/**
 * Convierte a mayúsculas el primer carácter de una cadena.
 *
 * @param {string} string Cadena de texto a convertir.
 * @returns {string} Cadena de texto convertida.
 */
const capitalize = string => string[0].toUpperCase() + string.slice(1)


/**
 * Encuentra un material que coincida con un elemento de búsqueda.
 * @param {Object[]} materials Lista de materiales en donde se realiza la búsqueda.
 * @param {Object} element Material a buscar.
 * @returns {Object} Material que coincida con la búsqueda.
 */
const findMaterial = (materials, element) => {
    return materials.find(obj => obj.name === element.name)
}

/**
 * Espera un tiempo antes de ejecutar el código.
 * @param {number} milliseconds El número de milisegundos que hay que esperar antes de ejecutar el código.
 * @returns {Promise} Promesa que se puede usar con async await.
 */
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Obtiene los materiales seleccionados y la cantidad de cada uno.
 * @param {Object[]} fields Campos del formulario.
 * @returns {Object[]} Array de objetos con los materiales.
 */
const getMaterials = fields => {
    let materials = ["cuero", "tela", "suela", "nylon"]
    let materialsObject = []
    let field = null

    fields.map(obj => {
        if (materials.includes(obj.name)) field = obj.name
        if (field !== null && `quantity${capitalize(field)}` === obj.name) {
            materialsObject.push({name: field, quantity: obj.value})
            field = null
        }
    });
    return materialsObject
}

/**
 * Verifica la cantidad de material.
 * @param {Object[]} materials Materiales seleccionados por el usuario.
 * @returns {Promise<boolean>} TRUE si la cantidad de los materiales es menor o igual a la cantidad disponible, FALSE
 * en caso contrario.
 */

const checkMaterialQuantity = async materials => {
    $('#checkMaterialQuantity').removeClass('d-none')
    await sleep(time)
    let flag = true
    materials.map(mat => {
        const material = findMaterial(availableMaterials, mat)
        if (mat.quantity > material.quantity) flag = false
    })
    return flag
}


/**
 * Actualiza la cantidad de los materiales y verifica las cantidades de los materiales.
 * @param {Object[]} materials Materiales seleccionados por el usuario.
 * @returns {Promise<boolean>} TRUE si la cantidad de los materiales es menor o igual a la cantidad disponible, FALSE
 * en caso contrario.
 */
const provideMaterials = async materials => {
    $('#provideMaterials').removeClass('d-none')
    await sleep(time)
    materials.map(mat => {
        const material = findMaterial(availableMaterials, mat)
        if (mat.quantity > material.quantity) {
            material.quantity = parseInt(mat.quantity)
        }
    })
    return checkMaterialQuantity(availableMaterials)
}

/**
 * Muestra el proceso de agregar materiales.
 * @returns {Promise<void>}
 */
const addMaterials = async () => {
    await sleep(time)
    $('#addMaterials').removeClass('d-none')
}

/**
 * Muestra el proceso de cortar los materiales
 * @returns {Promise<void>}
 */
const cutMaterials = async () => {
    await sleep(time)
    $('#cutMaterials').removeClass('d-none')
}

/**
 * Muestra el proceso de montado de los materiales
 * @returns {Promise<void>}
 */
const assemblyMaterials = async () => {
    await sleep(time)
    $('#assemblyMaterials').removeClass('d-none')
}

/**
 * Muestra el proceso de pegado de los materiales
 * @returns {Promise<void>}
 */
const bondingMaterials = async () => {
    await sleep(time)
    $('#bondingMaterials').removeClass('d-none')
}

/**
 * Verifica la calidad del los zapatos
 * @param {number|boolean} status Estado de la calidad del producto
 * @returns {Promise<boolean|*>} Estado de la calidad
 */
const checkQuality = async status => {
    await sleep(time)
    $('#checkQuality').removeClass('d-none')
    return typeof status === 'number' ? Boolean(status) : status
}

/**
 *  Muestra el proceso de reparación y verifica la calidad de los zapatos.
 * @param {boolean} status Estado de la calidad
 * @returns {Promise<boolean|*>} TRUE si los zapatos fueron reparados, FALSE en caso contrario.
 */
const repairShoes = async status => {
    await sleep(time)
    $('#repairShoes').removeClass('d-none')
    return checkQuality(!status)
}

/**
 * Muestra el proceso de revitalización de los materiales
 * @returns {Promise<void>}
 */
const revitalizeMaterials = async () => {
    await sleep(time)
    $('#revitalizeMaterials').removeClass('d-none')
}

/**
 * Muestra el proceso de empacado de los zapatos
 * @returns {Promise<void>}
 */
const packShoes = async () => {
    await sleep(time)
    $('#packShoes').removeClass('d-none')
}

/**
 * Muestra el proceso de definición de precio unitario de venta de los zapatos
 * @returns {Promise<void>}
 */
const setPrice = async () => {
    await sleep(time)
    $('#setPrice').removeClass('d-none')
}

/**
 * Muestra el proceso de almacenar los zapatos en la bodega
 * @returns {Promise<void>}
 */
const setWarehouse = async () => {
    await sleep(time)
    $('#setWarehouseNumber').removeClass('d-none')
}
