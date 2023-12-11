import { React } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

export const CardComponent = ({ name, issuer, bin, color }) => {
    bin = bin.split("")
    bin.splice(4, 0, " ")
    bin = bin.join("")
    return (
        <View style={styles.cardView}>
            <LinearGradient
                colors={[color, pSBC(-0.3, color)]}
                style={styles.gradient}
            />
            <Text
                style={styles.cardName}>{name}</Text>
            <Text
                style={styles.issuerName}>{issuer}</Text>
            <Text
                style={styles.cardNumberInput}
                // title="2937 38"
                // keyboardType='numeric'
            >{bin}</Text>
            <View
                style={styles.cardNameContainer}
            />
        </View>
    );

}
export default CardComponent

const styles = StyleSheet.create({
    cardView: {
        // width: 325,
        height: 200,
        position: "relative",
        // borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2

        // backgroundColor: "blue"
    },
    cardName: {
        position: "absolute",
        top: 20,
        left: 20,
        color: "white",
        fontWeight: "bold",
        fontSize: 24
    },
    issuerName: {
        position: "absolute",
        top: 50,
        left: 20,
        color: "white",
        opacity: 0.6,
        // fontWeight: "bold",
        fontSize: 20,
        // fontStyle: "italic"
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 15
    },
    cardNumberInput: {
        position: "absolute",
        bottom: 20,
        left: 20,
        // right: 20,
        width: 95,
        height: 32,
        borderBottomColor: "white",
        borderBottomWidth: 2,
        // backgroundColor: "red",
        fontFamily: "Courier New",
        color: "white",
        fontWeight: "bold",
        fontSize: 21
    },
    cardNameContainer: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        display: "flex"
    },
    
})
