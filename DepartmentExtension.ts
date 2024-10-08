/// <reference path="../../../../../../lib/p2js.d.ts" />
/// <reference path="../../../../../../lib/api.d.ts" />
/// <reference path="../../../../../../lib/qadextensionsgen.d.ts" />
/// <reference path="../../../../../../lib/engineeringgen.d.ts" />

namespace com.extensions.qadextensions.dev {
    import DepartmentExDTO = com.extensions.qadextensions.DepartmentEx.gen.dto.DepartmentExData;
    import ServiceLocator = com.qad.tsfoundation.service.ServiceLocator;

    import EngineeringClass = com.qad.engineering.setup.gen.bc.DepartmentMasters;
    import engineeringDTO = qad.engineering.setup.gen.dto.DepartmentMasterData;

    import SQLConnection = qad.tsfoundation.sql.SQLConnection;


    export class DepartmentEx extends com.extensions.qadextensions.DepartmentEx.gen.bc.DepartmentEx {
        engClass = new EngineeringClass()
        /** Uncomment method which you want to override */
        // public initialize() {
        //     const data = super.initialize();

        //     return data;
        // }

        public SQLConect(): void {
            let conn = new SQLConnection("qaddb");
        }

        public create(dsEntity: DepartmentExDTO): void {
            let DomainCode = dsEntity.dsDepartmentEx.ttDepartmentEx[0].DomainCode
            let DepartmentCode = dsEntity.dsDepartmentEx.ttDepartmentEx[0].DepartmentCode
            
            // let conn = new SQLConnection("qaddb");
            // let departmentCode = dsEntity.dsDepartmentEx.ttDepartmentEx[0].DepartmentCode;
            // let replySelect = conn.executeSQL(`select dpt_dept from MFGDB.PUB.dpt_mstr where dpt_mstr.dpt_dept = ${departmentCode}`, true);
            // let tst = JSON.stringify(replySelect.data[0])
            // // let dptExists = this.engClass.fetch(dsEntity.dsDepartmentEx.ttDepartmentEx[0].DomainCode, dsEntity.dsDepartmentEx.ttDepartmentEx[0].DepartmentCode)
            // if (tst == undefined) {
            //     this.addValidationError("Invalid Department")
            // }

            let dptExist = this.engClass.fetch(DomainCode, DepartmentCode)
            let tst = JSON.stringify(dptExist.dsDepartmentMaster)

            let isValid = tst == "{}" ? true : false
            
            if(isValid) {
                this.addValidationError("Invalid Department")
            }
            this.throwAddedValidationErrors();
            super.create(dsEntity);
        }

        // public delete(dsEntity: DepartmentExDTO): void {
        //     super.delete(dsEntity);
        // }

        // public exists(DomainCode: string, DepartmentCode: string): boolean {
        //     const exists = super.exists(DomainCode, DepartmentCode);

        //     return exists;
        // }

        // public fetch(DomainCode: string, DepartmentCode: string) {
        //     const data = super.fetch(DomainCode, DepartmentCode);

        //     return data;
        // }

        // public update(dsEntity: DepartmentExDTO): void {
        //     super.update(dsEntity);
        // }
    }

    export class DepartmentExFactory extends com.extensions.qadextensions.DepartmentEx.gen.bc.DepartmentExFactory {
        public getInstance(): DepartmentEx {
            return new DepartmentEx();
        }
    }

    ServiceLocator.STATIC_INSTANCE.addService(DepartmentEx.ENTITY_URI, new DepartmentExFactory());
    com.qad.p2js.bcscriptrunner.ScriptsRegistry.registerBCScript(DepartmentEx.ENTITY_URI, [
        /** Uncomment method which you want to override */
        // 'initialize',
        'create',
        // 'delete',
        // 'exists',
        // 'fetch',
        // 'update',
    ]);
}