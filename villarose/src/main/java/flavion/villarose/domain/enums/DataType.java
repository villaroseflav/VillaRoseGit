package flavion.villarose.domain.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum DataType {
    TEMPERATURE("temperature"),
    HUMIDITY("humidity"),
    PRESSURE("pressure"),
    DISTANCE("distance");

    private String value;

    DataType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }

    @JsonCreator
    public static DataType fromValue(String value) {
        for (DataType b : DataType.values()) {
            if (b.value.equals(value)) {
                return b;
            }
        }
        throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
}
