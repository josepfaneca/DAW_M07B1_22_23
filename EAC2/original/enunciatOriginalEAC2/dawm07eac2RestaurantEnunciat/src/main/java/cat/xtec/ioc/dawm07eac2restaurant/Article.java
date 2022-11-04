package cat.xtec.ioc.dawm07eac2restaurant;


/**
 *
 * @author German
 */
public class Article {
    private String name;
    private Double preu;
    private int quantitat;
    private Double preuparcial;

    public Double getPreuparcial() {
        return preuparcial;
    }

    public void setPreuparcial(Double preuParcial) {
        this.preuparcial = preuParcial;
    }

    public int getQuantitat() {
        return quantitat;
    }

    public void setQuantitat(int quantitat) {
        this.quantitat = quantitat;
    }

    public Double getPreu() {
        return preu;
    }

    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Article(String name, Integer preu) {
        this.name = name;
        this.preu = (double) preu;
        this.preuparcial = (double) 0;
    }
    
    public void setPreu(Double preu){
        this.preu = preu;
    }
    
}
