package io.openems.edge.fenecon.mini.pvmeter;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition( //
		name = "FENECON Mini PV-Meter", //
		description = "The pv-meter implementation of a FENECON Mini.")
@interface Config {
	String service_pid();

	String id() default "meter1";

	boolean enabled() default true;

	@AttributeDefinition(name = "Modbus-ID", description = "ID of Modbus bridge.")
	String modbus_id();

	@AttributeDefinition(name = "Modbus target filter", description = "This is auto-generated by 'Modbus-ID'.")
	String Modbus_target() default "";

	String webconsole_configurationFactory_nameHint() default "Fenecon Mini PV-Meter [{id}]";
}