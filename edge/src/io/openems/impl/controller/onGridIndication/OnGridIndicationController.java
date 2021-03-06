/*******************************************************************************
 * OpenEMS - Open Source Energy Management System
 * Copyright (c) 2016, 2017 FENECON GmbH and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * Contributors:
 *   FENECON GmbH - initial API and implementation and initial documentation
 *******************************************************************************/
package io.openems.impl.controller.onGridIndication;

import java.util.Optional;

import io.openems.api.channel.Channel;
import io.openems.api.channel.ConfigChannel;
import io.openems.api.channel.WriteChannel;
import io.openems.api.channel.thingstate.ThingStateChannels;
import io.openems.api.controller.Controller;
import io.openems.api.device.nature.ess.EssNature;
import io.openems.api.doc.ChannelInfo;
import io.openems.api.doc.ThingInfo;
import io.openems.api.exception.InvalidValueException;
import io.openems.api.exception.WriteChannelException;
import io.openems.core.ThingRepository;

@ThingInfo(title = "OnGridIndicationController", description = "indicates with an digitalOutput if the system is On-Grid.")
public class OnGridIndicationController extends Controller {

	private ThingRepository repo = ThingRepository.getInstance();
	private WriteChannel<Boolean> onGridOutputChannel;
	private State currentState = State.UNKNOWN;
	private boolean isProducerDisconnected = false;
	private long timeProducerDisconnected;
	private long startTime = System.currentTimeMillis();
	private ThingStateChannels thingState = new ThingStateChannels(this);

	private enum State {
		OFFGRID, ONGRID, SWITCHTOOFFGRID, SWITCHTOONGRID, UNKNOWN
	}

	// ConfigChannel

	@ChannelInfo(title = "The ess where the grid state should be read from.", type = Meter.class)
	public ConfigChannel<Meter> meter = new ConfigChannel<Meter>("meter", this);

	@ChannelInfo(title = "Ess", description = "Sets the Ess device.", type = Ess.class)
	public ConfigChannel<Ess> ess = new ConfigChannel<Ess>("ess", this);

	@ChannelInfo(title = "time to wait before switch output on.", type = Long.class)
	public ConfigChannel<Long> switchDelay = new ConfigChannel<Long>("switchDelay", this).defaultValue(10000L);

	@SuppressWarnings("unchecked")
	@ChannelInfo(title = "the address of the Digital Output to singal on-Grid.", type = String.class)
	public ConfigChannel<String> onGridOutputChannelAddress = new ConfigChannel<String>("onGridOutputChannelAddress",
			this).addChangeListener((channel, newValue, oldValue) -> {
				Optional<String> channelAddress = (Optional<String>) newValue;
				if (channelAddress.isPresent()) {
					Optional<Channel> ch = repo.getChannelByAddress(channelAddress.get());
					if (ch.isPresent()) {
						onGridOutputChannel = (WriteChannel<Boolean>) ch.get();
						onGridOutputChannel.required();
					} else {
						log.error("Channel " + channelAddress.get() + " not found");
					}
				} else {
					log.error("'onGridOutputChannelAddress' is not configured!");
				}
			});

	public OnGridIndicationController() {
		super();
	}

	public OnGridIndicationController(String thingId) {
		super(thingId);
	}

	@Override
	public void run() {
		if (startTime + 1000 * 15 <= System.currentTimeMillis()) {
			try {
				Meter meter = this.meter.value();
				Ess ess = this.ess.value();
				switch (currentState) {
				case OFFGRID:
					if (isOff()) {
						// if (meter.voltage.valueOptional().isPresent()) {
						// currentState = State.SWITCHTOONGRID;
						// }
						if (ess.gridMode.labelOptional().equals(Optional.of(EssNature.ON_GRID))) {
							currentState = State.SWITCHTOONGRID;
						}
					} else {
						currentState = State.SWITCHTOOFFGRID;
					}
					break;
				case ONGRID: {
					if (isOnGrid()) {
						if (!meter.voltage.valueOptional().isPresent()
								&& ess.gridMode.labelOptional().equals(Optional.of(EssNature.OFF_GRID))) {
							currentState = State.SWITCHTOOFFGRID;
						}
					} else {
						currentState = State.SWITCHTOONGRID;
					}
				}
				break;
				case SWITCHTOOFFGRID:
					if (isOff()) {
						currentState = State.OFFGRID;
					} else {
						onGridOutputChannel.pushWrite(false);
					}
					break;
				case SWITCHTOONGRID:
					if (isOnGrid()) {
						currentState = State.ONGRID;
						isProducerDisconnected = false;
					} else {
						if (isOff()) {
							if (!isProducerDisconnected) {
								isProducerDisconnected = true;
								timeProducerDisconnected = System.currentTimeMillis();
							}
							if (timeProducerDisconnected + switchDelay.value() <= System.currentTimeMillis()
									&& isProducerDisconnected) {
								onGridOutputChannel.pushWrite(true);
							}
						} else {
							isProducerDisconnected = false;
							onGridOutputChannel.pushWrite(false);
						}
					}
					break;
				default: {
					if (meter.voltage.valueOptional().isPresent()
							|| ess.gridMode.labelOptional().equals(Optional.of(EssNature.ON_GRID))) {
						if (isOnGrid()) {
							currentState = State.ONGRID;
						} else {
							currentState = State.SWITCHTOONGRID;
						}
					} else {
						if (isOff()) {
							currentState = State.OFFGRID;
						} else {
							currentState = State.SWITCHTOOFFGRID;
						}
					}
				}
				break;

				}
			} catch (InvalidValueException e) {
				log.error("Failed to read value!", e);
			} catch (WriteChannelException e) {
				log.error("Failed to switch Output!", e);
			}
		}
	}

	private boolean isOff() throws InvalidValueException {
		return onGridOutputChannel.value() == false;
	}

	private boolean isOnGrid() throws InvalidValueException {
		return onGridOutputChannel.value() == true;
	}

	@Override
	public ThingStateChannels getStateChannel() {
		return this.thingState;
	}

}
