package flavion.villarose.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "token")
    private String token;

    @Column(name = "domain")
    private String domain;

    @Column(name = "endpoint")
    private String endpoint;

    @Column(name = "ssid")
    private String ssid;

    @Column(name = "password")
    private String password;

    @Column(name = "status")
    private int status;

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Sensor> sensors = new ArrayList<>();

    @Override
    public String toString() {
        return "Device [id=" + id + ", name=" + name + ", sensors=" + sensors + "]";
    }
}
