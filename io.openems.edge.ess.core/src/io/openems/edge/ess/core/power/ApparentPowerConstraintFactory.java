package io.openems.edge.ess.core.power;

import java.util.ArrayList;
import java.util.List;

import io.openems.edge.ess.api.ManagedSymmetricEss;
import io.openems.edge.ess.power.api.Constraint;
import io.openems.edge.ess.power.api.LinearCoefficient;
import io.openems.edge.ess.power.api.Phase;
import io.openems.edge.ess.power.api.Pwr;
import io.openems.edge.ess.power.api.Relationship;

public class ApparentPowerConstraintFactory {

	private final static int CIRCLE_SECTIONS_PER_QUARTER = 2; // don't set higher than 90

	private class Point {
		protected final double x;
		protected final double y;

		Point(double x, double y) {
			this.x = x;
			this.y = y;
		}

		@Override
		public String toString() {
			return "Point [x=" + Math.round(x) + ", y=" + Math.round(y) + "]";
		}
	}

	private final Data parent;

	public ApparentPowerConstraintFactory(Data parent) {
		this.parent = parent;
	}

	public List<Constraint> getConstraints(ManagedSymmetricEss ess, Phase phase, double apparentPower) {
		List<Constraint> result = new ArrayList<>();
		double degreeDelta = 90.0 / CIRCLE_SECTIONS_PER_QUARTER;
		Point p1 = this.getPointOnCircle(apparentPower, 0);

		for (double degree = degreeDelta; Math.floor(degree) <= 360; degree += degreeDelta) {
			Point p2 = this.getPointOnCircle(apparentPower, degree);

			Relationship relationship;
			if (Math.floor(degree) <= 180) {
				relationship = Relationship.GREATER_OR_EQUALS;
			} else {
				relationship = Relationship.LESS_OR_EQUALS;
			}

			Constraint constraint = this.getConstraintThroughPoints(ess, phase, p1, p2, relationship);
			result.add(constraint);

			// set p2 -> p1 for next loop
			p1 = p2;
		}
		return result;
	}

	private Point getPointOnCircle(double radius, double degree) {
		return new Point(Math.cos(Math.toRadians(degree)) * radius, Math.sin(Math.toRadians(degree)) * radius);
	}

	private Constraint getConstraintThroughPoints(ManagedSymmetricEss ess, Phase phase, Point p1, Point p2,
			Relationship relationship) {
		/**
		 * Build the LinearConstraint.
		 * 
		 * <pre>
		 *  We use the formula:
		 *  y = ((y2-y1)/(x2-x1)) * x + ((x2*y1-x1*y2)/(x2-x1))
		 * </pre>
		 */
		double constraintValue = -1 * (p1.y * p2.x - p2.y * p1.x) / (p2.x - p1.x);
		double coefficient1 = (p2.y - p1.y) / (p2.x - p1.x);
		double coefficient2 = -1;

		return new Constraint(ess.id() + ": Max Apparent Power", new LinearCoefficient[] { //
				new LinearCoefficient(this.parent.getCoefficient(ess, phase, Pwr.ACTIVE), coefficient1), //
				new LinearCoefficient(this.parent.getCoefficient(ess, phase, Pwr.REACTIVE), coefficient2) //
		}, relationship, constraintValue);
	}
}
