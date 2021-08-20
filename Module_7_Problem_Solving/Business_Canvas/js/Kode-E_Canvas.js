const {observable, computed} = mobx;
const {observer} = mobxReact;
const {Component} = React;

// test
class CanvasSection {
  constructor (id, title, width, height) {
    this.id = id;
    this.title = title;
    this.width = width;
    this.height = height;
  }
}

class CanvasItem {
    id = Math.random();
    @observable title;
    @observable section;
    @observable finished = false;
    constructor(title, section) {
        this.title = title;
        this.section = section;
    }
}

class CanvasItemList {
    id = Math.random();
    @observable canvasItems = [];
    @computed get unfinishedCanvasItemCount() {
        return this.canvasItems.filter(canvasItem => !canvasItem.finished).length;
    }
}

@observer
class CanvasView extends Component {
  render(){
    return <CanvasItemListView canvasItemList={store} />
  }
}

@observer
class CanvasItemListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.canvasItemList.canvasItems.map(canvasItem => 
                    <CanvasItemView canvasItem={canvasItem} key={canvasItem.id} />
                )}
            </ul>
            Tasks left: {this.props.canvasItemList.unfinishedCanvasItemCount}
        </div>
    }
}

const CanvasItemView = observer(({canvasItem}) => 
    <li>
        <input
            type="checkbox"
            checked={canvasItem.finished}
            onClick={() => canvasItem.finished = !canvasItem.finished}
        />{canvasItem.title} + {canvasItem.section}
    </li>
);

const store = new CanvasItemList();

ReactDOM.render(<CanvasView store={store} />, document.getElementById('mount'));
/*
store.canvas.push(
  //id, title, width, height
  new CanvasSection("KR","Key Resources",1,1),
  new CanvasSection("CS","Customer Segments",1,1)
);
*/
store.canvasItems.push(
    new CanvasItem("Get Coffee","KR"),
    new CanvasItem("Write simpler code", "CS")
);
store.canvasItems[0].finished = true;


  
