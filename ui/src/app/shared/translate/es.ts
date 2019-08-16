export const TRANSLATION = {
    General: {
        Cumulative: "Valores Acumulativos",
        Grid: "Red",
        GridBuy: "Relación",
        GridSell: "Fuente de alimentación",
        OffGrid: "No hay conexión de red",
        Production: "Producción",
        Consumption: "Consumo",
        Load: "la cantidad",
        Power: "Rendimiento",
        StorageSystem: "Almacenamiento",
        History: "Historia",
        Live: 'Live',
        NoValue: "Sin valor",
        Soc: "Cargo",
        Percentage: "Por ciento",
        More: "Más...",
        ChargePower: "Carga",
        DischargePower: "Descarga",
        ActualPower: "e-car Carga",
        PeriodFromTo: "de {{value1}} para {{value2}}", // value1 = beginning date, value2 = end date
        DateFormat: "dd.MM.yyyy", // e.g. German: dd.MM.yyyy, English: yyyy-MM-dd (dd = Day, MM = Month, yyyy = Year)
        Search: "Búsqueda",
        Week: {
            Monday: "Lunes",
            Tuesday: "Martes",
            Wednesday: "Miércoles",
            Thursday: "Jueves",
            Friday: "Viernes",
            Saturday: "Sábado",
            Sunday: "Domingo"
        },
        ReportValue: "Reportar datos corruptos"
    },
    Menu: {
        Index: "Visión general",
        AboutUI: "Sobre FEMS-UI",
        GeneralSettings: 'Configuración general',
        EdgeSettings: 'Configuración FEMS',
        Menu: 'Menú',
        Overview: 'estudio FEMS',
        Logout: 'Desuscribirse'
    },
    Index: {
        AllConnected: "Todas las conexiones establecidas.",
        ConnectionSuccessful: "Conexión a {{value}} hecho.", // value = name of websocket
        ConnectionFailed: "Conexión a {{value}} seperados.", // value = name of websocket
        ToEnergymonitor: "Al monitor de energía...",
        IsOffline: "OpenEMS está fuera de línea!"
    },
    Edge: {
        Index: {
            Energymonitor: {
                Title: "Monitor de energía",
                ConsumptionWarning: "Consumo y productores desconocidos",
                Storage: "Memoria",
                ReactivePower: "Potencia reactiva",
                ActivePower: "Potencia de salida",
                GridMeter: "Medidor de potencia",
                ProductionMeter: "Contador de generación",
                StorageDischarge: "Descarga de memoria",
                StorageCharge: "Carga del almacenaje"
            },
            Energytable: {
                Title: "Zabla de energía",
                LoadingDC: "Cargando DC",
                ProductionDC: "Generación DC"
            },
            Widgets: {
                Info: "La suma de las fases individuales puede diferir ligeramente del total por razones técnicas.",
                CHP: {
                    LowThreshold: "Umbral bajo",
                    HighThreshold: "Umbral alto"
                },
                EVCS: {
                    ChargingStation: "Carga",
                    ChargingStationCluster: "Grupo de estaciones de carga",
                    OverviewChargingStations: "Resumen de estaciones de carga",
                    ChargingStationDeactivated: "Estación de carga desactivada",
                    Prioritization: "Priorización",
                    Status: "Status",
                    Starting: "Comenzó",
                    NotReadyForCharging: "No está liesto para la carga",
                    ReadyForCharging: "Listo para cargar",
                    Charging: "Inicio de Carga",
                    NotCharging: "No cobrar",
                    Error: "Error",
                    NotAuthorized: "No autorizado",
                    Unplugged: "No conectado",
                    ChargingStationPluggedIn: "Estación de carga encufada",
                    ChargingStationPluggedInLocked: "Estación de carga enchufada + bloqueado",
                    ChargingStationPluggedInEV: "Estación de carga + e-Car enchufado",
                    ChargingStationPluggedInEVLocked: "Estación de carga + e-Car enchufado + bloqueando",
                    ChargingLimit: "Límite de carga",
                    ChargingPower: "Energía de carga",
                    AmountOfChargingStations: "Cantidad de estaciones de carga",
                    TotalChargingPower: "Potencia de carga total",
                    CurrentCharge: "Carga actual",
                    TotalCharge: "Carga total",
                    EnforceCharging: "Forzar la carga",
                    Cable: "Cable",
                    CableNotConnected: "El cable no esta conectado",
                    CarFull: "El carro esta lleno",
                    EnergieSinceBeginning: "Energía desde el último inicio de carga",
                    ChargeMode: "Modo de carga",
                    ActivateCharging: "Activar la estación de carga.",
                    ClusterConfigError: "Se ha producido un error en la configuración del clúster Evcs.",
                    NoConnection: {
                        Description: "No se pudo conectar a la estación de carga.",
                        Help1: "Compruebe si la estación de carga está encendida y se puede acceder a ella a través de la red",
                        Help1_1: "La IP de la estación de carga aparece cuando se enciende nuevamente"
                    },
                    OptimizedChargeMode: {
                        Name: "Carga optimizada",
                        ShortName: "Optimizado",
                        Info: "En este modo, la carga del automóvil se ajusta a la producción y consumo actuales.",
                        MinInfo: "Si desea evitar que el automóvil no se cargue por la noche, puede establecer un cargo mínimo.",
                        MinCharging: "Garantía de carga mínima?",
                        ChargingPriority: "Dependiendo de la priorización, el componente seleccionado se cargará primero"
                    },
                    ForceChargeMode: {
                        Name: "Carga forzada",
                        ShortName: "Forzado",
                        Info: "En este modo se aplica la carga del automóvil, i. Siempre se garantiza que el automóvil se cargará, incluso si la estación de carga necesita acceder a la red eléctrica.",
                        MaxCharging: "Fuerza de carga maxima:",
                        MaxChargingDetails: "Si el automóvil no puede cargar el valor máximo introducido, la potencia se limita automáticamente."
                    }
                }
            }
        },
        History: {
            SelectedPeriod: "Período seleccionado: ",
            OtherPeriod: "Otro período",
            Period: "Período",
            SelectedDay: "{{value}}",
            Today: "Hoy",
            Yesterday: "Ayer",
            LastWeek: "La semana pasada",
            LastMonth: "El me pasado",
            LastYear: "El año pasado",
            Go: "Nwo!",
            Export: "descargar como archivo de excel"
        },
        Config: {
            Index: {
                Bridge: "Conexiones y dispositivos",
                Scheduler: "Planificador de aplicaciones",
                Controller: "Aplicaciones",
                Simulator: "Simulador",
                ExecuteSimulator: "Ejecutar simulaciones",
                Log: "Registro",
                LiveLog: "Protocolos de sistema de vida",
                AddComponents: "Instalar componentes",
                AdjustComponents: "Configurar componentes",
                ManualControl: "Control manual",
                DataStorage: "Almacenamiento de datos"
            },
            More: {
                ManualCommand: "Comando manual",
                Send: "Enviar",
                RefuInverter: "REFU Inversor",
                RefuStartStop: "Iniciar/detener inversor",
                RefuStart: "Empezar",
                RefuStop: "Parada",
                ManualpqPowerSpecification: "Especificaciones de rendimiento",
                ManualpqSubmit: "Tomar",
                ManualpqReset: "Restablecer"
            },
            Scheduler: {
                NewScheduler: "Nuevo programador...",
                Class: "Clase:",
                NotImplemented: "Formulario no implementado: ",
                Contact: "Eso no debería suceder. Póngase es contacto con <a href=\"mailto:{{value}}\">{{value}}</a>.",
                Always: "Siempre"
            },
            Log: {
                AutomaticUpdating: "Actualización automática",
                Timestamp: "Hora",
                Level: "Nivel",
                Source: "Ésos",
                Message: "Mensaje"
            },
            Controller: {
                InternallyID: "Interno ID:",
                App: "Aplicación:",
                Priority: "Priodad:"
            },
            Bridge: {
                NewDevice: "Nuevo dispositivo...",
                NewConnection: "Nueva conexión..."
            }
        }
    },
    About: {
        UI: "Interfaz de usario para FEMS y OpenEMS",
        Developed: "Esta interfaz de usario es desarrollada por FENECON como software de código abierto.",
        Fenecon: "Acerca de FENECON",
        OpenEMS: "Acerca de OpenEMS",
        CurrentDevelopments: "Desarrollos actuales",
        Build: "Esta compilación",
        Contact: "Para preguntas y sugerencias sobre el sistema, por favor contacte a nuestro FEMS-Team en <a href=\"mailto:{{value}}\">{{value}}</a>.",
        Language: "Seleccionar idioma:",
        FAQ: "Preguntas frecuentes (FAQ)"
    },
    Notifications: {
        Failed: "Error al configurar la conexión.",
        LoggedInAs: "Conectado como usuario \"{{value}}\".", // value = username
        LoggedIn: "Registrado.",
        AuthenticationFailed: "Sin conexión: error de autenticación.",
        Closed: "Conexión terminada."
    }
}
