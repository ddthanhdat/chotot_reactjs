class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        }
        this.handleData = this.handleData.bind(this);
        this.showMap = this.showMap.bind(this);
    }
    handleData(data) {
        console.log(data);
        var newItems = this.state.items;
        var item = data.ad;
        item.image = data.ad.images[0];
        item.size = data.ad_params.size.value;
        newItems.push(item);
        this.setState({items: newItems});
    }

    componentWillMount(){
        var oldItems = this.props.items;
        oldItems.forEach(item => {
            var url = 'https://gateway.chotot.com/v1/public/ad-listing/'+item.list_id;
            $.get(url, this.handleData);
        });
    }

    showMap(item){
        var latLong = new google.maps.LatLng(item, item);
        var marker = new google.maps.Marker({
            position: latLong,
            map: map,
            title: 'some title'
        });
        
        console.log(item);
        map.setCenter(marker.getPosition());
    }
    render (){
        var rows = this.state.items.map(item => {
            return <tr>
                <td>
                    <img src={item.image} alt="" width="200px"/>                
                </td>
                <td title={item.body}>
                    {item.subject}
                    <br/>
                    {item.size}
                    <br/>
                    {item.address}
                    <br/>
                    <h4>{item.phone}</h4>
                </td>
                <td>
                    {item.date}
                </td>
                <td>
                    {item.price_string}
                </td>
                <td>
                    <button type="button" onClick={() => this.showMap(item)} className="btn btn-primary">show map</button>
                </td>
            </tr>
        });
        
        return <div className="col-12">
        <table className="table">
            <thead>
            </thead>

            <tbody>
                {rows}
                
            </tbody>
        </table>
            
            
        </div>
    }
};