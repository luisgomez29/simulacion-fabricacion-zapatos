/*!
 * Simulación de procesos de fabricación de zapatos.
 * Copyright 2020. Luis Guillermo Gómez Galeano
 * Todos los derechos reservados.
 */

$(document).ready(function () {
    $('#simulationForm').on('submit', async function (e) {
        e.preventDefault()
        let startTime = performance.now()
        let fields = $(this).serializeArray()

        await main(fields)

        let endTime = performance.now()
        showSummary(fields, startTime, endTime)
    })

    $('#btnResetSimulation').on('click', function () {
        resetSimulation()
    })
});

/**
 *
 * @param {Object[]} fields Campos del formulario.
 * @returns {Promise<void>}
 */
const main = async fields => {
    const materials = getMaterials(fields)
    const verify = await checkMaterialQuantity(materials)
    let newVerify = false

    // verificar cantidad de material
    if (!verify) {
        newVerify = await provideMaterials(materials)
    }

    if (verify || newVerify) {
        await addMaterials();
        await cutMaterials();
        await assemblyMaterials();
        await bondingMaterials();

        // Verificar estado de calidad
        let qualityStatus = await checkQuality(Math.round(Math.random()))
        if (!qualityStatus) {
            qualityStatus = await repairShoes(qualityStatus)
        }

        if (qualityStatus) {
            await revitalizeMaterials()
            await packShoes()
            await setPrice()
            await setWarehouse()
        }
    }
}

/**
 *
 * @param {Object[]} fields Campos del formulario.
 * @param {number} startTime Tiempo inicial del rendimiento de la aplicación.
 * @param {number} endTime Tiempo final del rendimiento de la aplicación.
 */
const showSummary = (fields, startTime, endTime) => {
    $('#simulation_summary').removeClass('d-none')
    $('#simulation_summary_ifo').html(`
        <div class="card-body">
            <p class="card-text"><strong>Total producción: </strong> Se fabricaron <strong>${fields[0].value}</strong> zapatos</p>
            <p class="card-text"><strong>Tipo de zapato: </strong> ${fields[1].value}</p>
            <p class="card-text"><strong>Precio unitario de venta: </strong> ${fields[2].value}</p>
            <p class="card-text"><strong>Número de bodega:</strong> ${fields[3].value}</p>
            <p class="card-text"><strong>Tipo de fabricación: </strong> ${endTime - startTime} segundos</p>
        </div>
    `)
}

/**
 * Vuelve a ejecutar la simulación
 */
const resetSimulation = () => {
    $('#simulation_process .col-12.col-sm-6').addClass('d-none')
    $('#simulation_summary').addClass('d-none')
    $('#simulation_summary_ifo').html(``)
    $('#simulationForm').submit()
}


