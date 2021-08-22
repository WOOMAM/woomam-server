/** * @author Jaeyong Park <scorpion@dgu.ac.kr> */
module.exports = {
    //SELECT
    getAllWMs : `select * from woomam_wms`,
    getStoreWMs: `select * from woomam_wms where storeUID=?`,
    getTargetWM : `select * from woomam_wms where washingMachineUID=?`,

    //UPDATE
    updateTargetWM : `update woomam_wms set taskFrom = ?, taskTo = ?, bookedTime=?, phoneNumber =?, qrState = ?, arduinoState=?,washingMachineState=? where washingMachineUID=?`,
    bookTargetMachine : `update woomam_wms set bookedTime=?,phoneNumber=? where washingMachineUID=?`,
    qrfirstCheck : `update woomam_wms set qrState='verified' where washingMachineUID=?`,
    startTargetWM :`update woomam_wms set taskFrom = ?, taskTo = ?, arduinoState=?,washingMachineState=? where washingMachineUID=?`,
}