var A320_Neo_LowerECAM_COND;
(function (A320_Neo_LowerECAM_COND) {
    class Definitions {

    }
    A320_Neo_LowerECAM_COND.Definitions = Definitions;
    class Page extends Airliners.EICASTemplateElement {
        constructor() {
            super();
            this.isInitialised = false;
        }
        get templateID() { return "LowerECAMCONDTemplate"; }
        connectedCallback() {
            super.connectedCallback();
            TemplateElement.call(this, this.init.bind(this));
        }
        init() {
            this.isInitialised = true;
            this.cockpitTemp = this.querySelector("#cockpit-temp");
            this.fwdTemp = this.querySelector("#fwd-temp");
            this.aftTemp = this.querySelector("#aft-temp");
            this.cockpitAirflow = this.querySelector("#cockpit-airflow");
            this.fwdAirflow = this.querySelector("#fwd-airflow");
            this.aftAirflow = this.querySelector("#aft-airflow");
            this.temperatures = [18, 20, 22, 24, 26, 28, 30];
            this.compartmentTimer = -1;
            this.timerInProgress = false;
        }
        update(_deltaTime) {
            if (!this.isInitialised) {
                return;
            }

            var currentAirCondKnobState1 = SimVar.GetSimVarValue("L:A320_Neo_AIRCOND_LVL_1", "Enum");
            var currentAirCondKnobState2 = SimVar.GetSimVarValue("L:A320_Neo_AIRCOND_LVL_2", "Enum");
            var currentAirCondKnobState3 = SimVar.GetSimVarValue("L:A320_Neo_AIRCOND_LVL_3", "Enum");
            var bleedAir = SimVar.GetSimVarValue("BLEED AIR APU", "bool") || SimVar.GetSimVarValue("BLEED AIR ENGINE", "bool");

            var targetTemperature = this.temperatures[currentAirCondKnobState1];

            if (bleedAir) {
                if (!(targetTemperature == parseInt(this.cockpitTemp.textContent)) && !this.timerInProgress) {
                    this.compartmentTimer = 15;
                    this.timerInProgress = true;
                }
            }
            
            if (this.compartmentTimer >= 0) {
                this.compartmentTimer -= _deltaTime / 1000;
                if (this.compartmentTimer <= 0 && this.compartmentTimer != -1) {
                    if (targetTemperature > this.cockpitTemp.textContent) {
                        this.cockpitTemp.textContent = parseInt(this.cockpitTemp.textContent) + 1;
                    } else {
                        this.cockpitTemp.textContent = parseInt(this.cockpitTemp.textContent) - 1;
                    }
                    
                    this.compartmentTimer = -1;
                    this.timerInProgress = false;
                }
            }

        }

        startCompartmentTemperatureChangeTimer(targetTemperature, currentCompartmentTemp, _deltaTime) {
            if (targetTemperature == currentCompartmentTemp) {
                return;
            }


        }

    }
    A320_Neo_LowerECAM_COND.Page = Page;
})(A320_Neo_LowerECAM_COND || (A320_Neo_LowerECAM_COND = {}));
customElements.define("a320-neo-lower-ecam-cond", A320_Neo_LowerECAM_COND.Page);
//# sourceMappingURL=A320_Neo_LowerECAM_COND.js.map