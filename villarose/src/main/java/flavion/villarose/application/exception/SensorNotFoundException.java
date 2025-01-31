package flavion.villarose.application.exception;

public class SensorNotFoundException extends RuntimeException {
    public SensorNotFoundException(String message) {
        super(message);
    }
}
