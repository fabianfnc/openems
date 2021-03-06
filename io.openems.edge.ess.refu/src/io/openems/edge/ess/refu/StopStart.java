package io.openems.edge.ess.refu;

import io.openems.edge.common.channel.doc.OptionsEnum;

enum StopStart implements OptionsEnum {
	STOP(0, "Stop"), //
	START(1, "Start");

	private int value;
	private String option;

	private StopStart(int value, String option) {
		this.value = value;
		this.option = option;
	}

	@Override
	public int getValue() {
		return value;
	}

	@Override
	public String getOption() {
		return option;
	}
}