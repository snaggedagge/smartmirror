package dkarlsso.smartmirror.backend.services;

import org.springframework.stereotype.Service;
import dkarlsso.smartmirror.backend.model.MotionUpdateRequest;
import dkarlsso.smartmirror.backend.model.MotionEvent;
import java.util.function.Consumer;

@Service
public interface MotionService {

    /**
     * Notifies service about a handMotion
     * @param motionUpdateRequest motionUpdateRequest
     */
    void notifyHandMotion(MotionUpdateRequest motionUpdateRequest, Consumer<MotionEvent> motionEventConsumer);
}
