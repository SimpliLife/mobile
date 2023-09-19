import { StyleSheet, Platform, Dimensions } from "react-native";

let width = Platform.OS == 'web' ? 400 : Dimensions.get('window').width
let width90 = width * 0.9

const styles = StyleSheet.create({
  headerBattery: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width
  },
  containerDefault: { flex: 1, alignItems: 'center' },
  categoryHeader: { justifyContent: "center" },
  textSymptom: { width: width90, textAlign: "left", fontWeight: "600", padding: 8, paddingTop: 2 },
  listSymptom: { width: width90, padding: 14, flex: 1, flexDirection: "row", gap: 8, alignItems: "center", borderRadius: 12, backgroundColor: "#F8F8F8", margin: 6 },
  circle: { backgroundColor: "#C6D7EF", width: 22, height: 22, borderRadius: 100, },
  symptomText: { color: "black", fontSize: 12 },
  // Input Location
  widthInputLocation: {
    width: width90,
    alignSelf: "center",
    paddingTop: 18,
    paddingBottom: 14
  },
  location: { fontSize: 14, paddingLeft: 5, fontWeight: "600" },
  touchableLocation: {
    marginTop: 8,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "#F6F6F6",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "600"
  },
  imageEditPencil: { width: 15, height: 15 },
  // Banner DiagnoAkses
  banner: {
    width: width90,
    alignSelf: "center",
    margin: "auto",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 12,
    shadowOpacity: 0.4,
    shadowRadius: 2.4,
    elevation: 3,
    padding: 12,
    gap: 8
  },
  bannerTitle: {
    color: '#EFEFEF',
    fontWeight: 'bold',
    fontSize: 14
  },
  bannerText: {
    color: '#EFEFEF',
    fontSize: 12,
    textAlign: 'justify',
  },
  card: {
    width: width * 0.42,
    height: 111,
    margin: 8,
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    padding: 10,
    gap: 2
  },
  // PraDiagnose Page
  viewPraDiagnose: { alignItems: 'center' },
  headerPraDiagnose: { textAlign: "left", fontWeight: "600", padding: 8, paddingTop: 4 },
  pertanyaanPradiagnose: { width: width90, textAlign: "left", fontWeight: "600", padding: 8, paddingTop: 2 },
  questionCard: {
    width: width90,
    borderRadius: 12, backgroundColor: "#F8F8F8", padding: 12, marginBottom: 10
  },
  textPraDiagnose: { fontSize: 12.5, textAlign: "left", fontWeight: "600", lineHeight: 20, paddingVertical: 6 },
  bottom30: { marginBottom: 30 },
  // ButtonPraDiagnose
  buttonPraDiagnose: {
    marginVertical: 6,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
    width: width90
  },
  buttonColorPradiagnose: { backgroundColor: "#C6D7EF", width: 22, height: 22, borderRadius: 100 },
  textButtonPraDiagnose: { textAlign: "left", color: "black", fontSize: 12, flexGrow: 1, margin: 6 },
  // PraDiagnosed Page
  containerPraDiagnosed: { flex: 1, alignItems: 'center', flexDirection: "column" },
  grouping: { width: width90, flexDirection: "column", gap: 8, marginTop: 4 },
  boxPraDiagnosed: { borderRadius: 12, backgroundColor: "#EBF3FF", padding: 12 },
  fontBox: { fontSize: 12.5, textAlign: "justify", fontWeight: "600", lineHeight: 20, paddingVertical: 6 },
  boxTindakan: { width: width90, padding: 12, display: "flex", minHeight: 30, borderRadius: 8, backgroundColor: "#F8F8F8" },
  textHeadTindakan: { fontSize: 12.5, textAlign: "left", fontWeight: "600", lineHeight: 20, paddingVertical: 6 },
  textTindakan: { fontSize: 12.5, textAlign: "justify" },
  groupButton: { flex: 1, gap: 16, paddingVertical: 18 },
  // Search Location Page,
  searchContainer: {
    paddingVertical: 8,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchItemContainer: {
    backgroundColor: "#F4F4F4",
    padding: 20,
    marginVertical: 5,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width90
  },
  searchDropDown: {
    borderColor: "#B7B7B7",
    zIndex: 20,
    height: 50,
    width: width90 / 3,
  },
  searchDropdownfilter: {
    width: width90 / 3,
    zIndex: 20
  },
  searchInput: {
    borderColor: "#B7B7B7",
    borderWidth: 1,
    height: 50,
    width: width90 / 1.5,
    paddingLeft: 8,
    borderRadius: 8,
  },
  searchTextStyle: {
    fontSize: 12,
    color: 'black',
    letterSpacing: 1,
  },
  searchTextStyleHead: {
    fontSize: 12,
    color: 'black',
    letterSpacing: 1,
    fontWeight: '600'
  },
  cariLokasiMu: { width: width90, textAlign: "left", fontWeight: "600", paddingVertical: 4 },
  searchZindex: { flexDirection: "row", zIndex: 20, gap: 4, paddingBottom: 14 },
  // Banner Symptom
  symptomB: {
    width: width90,
    height: 98,
    margin: "auto",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 12,
    shadowOpacity: 0.4,
    shadowRadius: 2.4,
    elevation: 3,
    padding: 10,
    gap: 8
  },
  symptompBImage: {
    width: 30, height: 30
  },
  symptompBTitle: {
    color: '#EFEFEF',
    fontWeight: 'bold',
    fontSize: 14
  },
  symptompBText: {
    color: '#EFEFEF',
    fontSize: 12,
    textAlign: 'justify',
  },
  buttonBlue: { width: width90, display: "flex", justifyContent: "space-between", borderRadius: 8, padding: 18, flexDirection: "row" },
  buttonBlueText: { color: '#FFF8F8', fontWeight: "700" },
  buttonBlueImage: { width: 11, height: 19 },
  containerChat: {
    width: width,
    flex: 1,
    paddingTop: 16,
    alignSelf: "center",
    paddingBottom: 18
  },
  // Map
  map: {
    width: width,
    height: Platform.OS === 'ios' ? 320 : 200,
  },
  boxLoading: {
    marginTop: 18,
    padding: 12,
    width: 200,
    height: 200,
    objectFit: "contain",
    alignSelf: "center",
  },
  containerLoading: {
    flex: 1,
    alignItems: 'flex-start'
  }
});

export default styles