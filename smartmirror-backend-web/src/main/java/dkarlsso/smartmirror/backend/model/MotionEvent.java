package dkarlsso.smartmirror.backend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MotionEvent {

    private final MotionType motionType;

    private final MovementDirection movementDirection;
}
