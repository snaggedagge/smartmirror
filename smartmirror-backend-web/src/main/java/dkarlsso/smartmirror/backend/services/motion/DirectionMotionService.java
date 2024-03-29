package dkarlsso.smartmirror.backend.services.motion;

import dkarlsso.smartmirror.backend.services.MotionService;
import dkarlsso.smartmirror.backend.model.CachedList;
import dkarlsso.smartmirror.backend.model.MotionUpdate;
import dkarlsso.smartmirror.backend.model.MotionUpdateRequest;
import dkarlsso.smartmirror.backend.model.MotionEvent;
import dkarlsso.smartmirror.backend.model.MovementDirection;
import dkarlsso.smartmirror.backend.model.MotionType;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

/**
 * Old class i was laborating with to get hand gestures working.
 * This implementation basically only checks if a hand is moving in kind of a straight line sideways
 */
@Service
@Primary
public class DirectionMotionService implements MotionService {

    private final CachedList<MotionUpdate> motionUpdates = new CachedList<>(2);

    private Instant latestEvent = Instant.now();


    @Override
    public void notifyHandMotion(final MotionUpdateRequest motionUpdateRequest, final Consumer<MotionEvent> motionEventConsumer) {
        //System.out.println(motionUpdateRequest.getMotionUpdates().get(0).getX() + "  " + motionUpdateRequest.getMotionUpdates().get(0).getY());
        if(motionUpdateRequest.getMotionUpdates().size() == 1 && latestEvent.plusMillis(1500).isBefore(Instant.now())) {
            motionUpdates.add(motionUpdateRequest.getMotionUpdates().get(0));

            if (motionUpdates.size() > 1) {
                final List<MovementDirection> movementDirections = new ArrayList<>();

                final List<MotionUpdate> allMotionUpdates = motionUpdates.getAll();
                //System.out.println("Motion update size " + allMotionUpdates.size());
                for (int i = 1; i < allMotionUpdates.size(); i++) {
                    double xDifferance = allMotionUpdates.get(i-1).getX() - allMotionUpdates.get(i).getX();
                    double yDifferance = allMotionUpdates.get(i-1).getY() - allMotionUpdates.get(i).getY();
                    if ((xDifferance > 10 || xDifferance < -10) && (yDifferance < 15 && yDifferance > -15)) {
                        movementDirections.add(xDifferance < 0 ? MovementDirection.LEFT : MovementDirection.RIGHT);
                    }
                }

                if (movementDirections.size() > 0) { // >Enough to just wait for one?
                    final MotionEvent motionEvent = MotionEvent.builder()
                            .motionType(MotionType.HAND_MOTION)
                            .movementDirection(movementDirections.get(0))
                            .build();
                    latestEvent = Instant.now();
                    motionEventConsumer.accept(motionEvent);
                }
            }
        }
    }

}
